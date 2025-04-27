import { Lancamento } from "./classes/Lancamento.js";
import { ControleFinanceiro } from "./classes/ControleFinanceiro.js";

const controle = new ControleFinanceiro();

// Elementos principais da DOM
const formulario = document.getElementById("formulario");
const saldoElemento = document.getElementById("saldo");
const listaLancamentos = document.getElementById("lista-lancamentos");

// Evento de envio do formulário
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = document.getElementById("data").value;
  const tipo = document.getElementById("tipo").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const descricao = document.getElementById("descricao").value;

  if (!data || !tipo || isNaN(valor) || !descricao) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  try {
    const novoLancamento = new Lancamento(data, tipo, valor, descricao);
    controle.adicionarLancamentos(novoLancamento);
    atualizarInterface();
    formulario.reset();
  } catch (erro) {
    alert(erro.message);
  }
});

// Atualizar tabela e saldo
function atualizarInterface() {
  // Atualiza o saldo
  const saldoAtual = controle.calcularSaldo();
  saldoElemento.textContent = `R$ ${saldoAtual.toFixed(2)}`;

  // Limpa a tabela
  listaLancamentos.innerHTML = "";

  // Preenche com os lançamentos
  controle.listarLancamentos().forEach((lancamento) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${lancamento.data}</td>
      <td>${lancamento.tipo.toUpperCase()}</td>
      <td>R$ ${lancamento.valor.toFixed(2)}</td>
      <td>${lancamento.descricao}</td>
    `;
    linha.classList.add(lancamento.tipo === "receita" ? "receita" : "despesa");
    listaLancamentos.appendChild(linha);
  });
}
