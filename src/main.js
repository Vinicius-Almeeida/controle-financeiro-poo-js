import { Lancamento } from '../src/Lancamento.js';
import { ControleFinanceiro } from '../src/ControleFinanceiro.js';

console.log("JS funcionando!");

const controle = new ControleFinanceiro();

const formulario = document.getElementById('formulario');
const saldoSpan = document.getElementById('saldo');
const listaLancamentos = document.getElementById('lista-lancamentos');

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); //Evita recarregar a página

    // Pegar os valores dos inputs
    const data = document.getElementById('data').value;
    const tipo = document.getElementById('tipo').value;
    const valor = document.getElementById('valor').value;
    const descricao = document.getElementById('descricao').value;

    try {
        // Cria o lançamento e adiciona o controle
        const novoLancamento = new Lancamento(data, tipo, valor, descricao);
        controle.adicionarLancamentos(novoLancamento);

        // Atualiza a interface
        atualizarInterface();
    } catch (erro) {
        alert(erro.message); // Mostra o erro na tela
    };

    formulario.reset(); // Limpa o formulário
});

function atualizarInterface() {
    // Atualiza o Saldo
    const saldoAtual = controle.calcularSaldo();
    console.log("Saldo calculado:", saldoAtual);

    saldoSpan.textContent = `R$ ${controle.calcularSaldo().toFixed(2)}`;
    // Atualiza a lista de lançamentos
    listaLancamentos.inneHTML = "";

    const todos = [...controle.listarReceitas(), ...controle.listarDespesas()];

    todos.forEach(lanc => {
        const item = document.createElement('li');
        item.textContent = `${lanc.data} | ${lanc.tipo.toUpperCase()} | R$ ${lanc.valor} | ${lanc.descricao}`;
        listaLancamentos.appendChild(item);
    })
};