import { Lancamento } from "./classes/Lancamento.js";
import { ControleFinanceiro } from "./classes/ControleFinanceiro.js";

const controle = new ControleFinanceiro();

const formulario = document.getElementById('formulario');
const saldoSpan = document.getElementById('saldo');
const listaLancamentos = document.getElementById('lista-lancamentos');
const inputValor = document.getElementById('valor');

let saldo = 0;

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  });
}

async function buscarLancamentos() {
  try {
    const resposta = await fetch('http://127.0.0.1:5000/lancamentos');
    const resultado = await resposta.json();
    const lancamentos = resultado.dados;

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

// Adicionar o lançamento na tabela
function adicionarLancamentoNaTela(lancamento) {
    const linha = document.createElement('tr');
    linha.classList.add(lancamento.tipo === 'receita' ? 'receita' : 'despesa');
    linha.innerHTML = `
      <td> ${lancamento.data} </td>
      <td> ${lancamento.tipo.toUpperCase()} </td>
      <td> ${formatarMoeda(lancamento.valor)} </td>
      <td> ${lancamento.descricao} </td>
    `;
    listaLancamentos.appendChild(linha);
}

// Evento de envio do formulário (cadastrar novo lançamento)
formulario.addEventListener('submit', async function (event) {
    event.preventDefault();

    const data = document.getElementById('data').value;
    const tipo = document.getElementById('tipo').value;
    const valorInput = document.getElementById('valor').value;
    const descricao = document.getElementById('descricao').value;

    const valor = parseFloat(
      valorInput.replace(/[^\d,]/g, '').replace(',', '.')
    );
    
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
        alert("Lançamento adicionado com sucesso");
        formulario.reset();
        buscarLancamentos();
            } else {
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