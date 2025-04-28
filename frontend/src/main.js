import { Lancamento } from "./classes/Lancamento.js";
import { ControleFinanceiro } from "./classes/ControleFinanceiro.js";

const controle = new ControleFinanceiro();

// Referências aos elementos do DOM
const formulario = document.getElementById('formulario');
const saldoSpan = document.getElementById('saldo');
const listaLancamentos = document.getElementById('lista-lancamentos');

// Atualiza o saldo total (iremos calcular depois de buscar todos os lançamentos)
let saldo = 0;

// Função utilitária para formatar moeda
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  });
}

// Função para buscar lançamentos do backend
async function buscarLancamentos() {
  try {
    const resposta = await fetch('http://127.0.0.1:5000/lancamentos');
    const lancamentos = await resposta.json();

    saldo = 0; // reset no saldo
    listaLancamentos.innerHTML = ""; // limpa a lista

    lancamentos.forEach(lancamento => {
      adicionarLancamentoNaTela(lancamento);
      saldo += lancamento.tipo === 'receita' ? lancamento.valor : -lancamento.valor;
    });

    saldoSpan.textContent = formatarMoeda(saldo);

  } catch (erro) {
    console.error('Erro ao buscar lançamentos:', erro);
  }
}

// Função para adicionar o lançamento na tabela
function adicionarLancamentoNaTela(lancamento) {
    const linha = document.createElement('tr');
    linha.classList.add(lancamento.tipo === 'receita' ? 'receita' : 'despesa');
    linha.innerHTML = `
      <td> ${lancamento.data} </>
      <td> ${lancamento.tipo.toUpperCase()} </>
      <td> ${formatarMoeda(lancamento.valor)} </>
      <td> ${lancamento.descricao} </>
    `;
    listaLancamentos.appendChild(linha);
}

// Evento de envio do formulário (cadastrar novo lançamento)
formulario.addEventListener('submit', async function (event) {
    event.preventDefault();

    const data = document.getElementById('data').value;
    const tipo = document.getElementById('tipo').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const descricao = document.getElementById('descricao').value;

    if(!data || !tipo || isNaN(valor) || !descricao) {
      alert("Preencha todos os campos corretamente");
      return;
    }

    const novoLancamento = { data, tipo, valor, descricao };

    try {
      const resposta = await fetch('http://127.0.0.1:5000/lancamentos', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(novoLancamento)
      });

      if(resposta.ok) {
        const erro = await resposta.json();
        alert(`Erro: ${erro.mensagem || "Erro desconhecido"}`);
      }
      
    } catch (erro) {
        console.error('Erro ao adicionar lançamento', erro);
        alert("Erro ao adicionar lançamento.");
    }
});

// Inicializa buscando lançamentos na primeira carga
buscarLancamentos();