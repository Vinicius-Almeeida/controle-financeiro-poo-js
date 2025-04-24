import { Lancamento } from "./classes/Lancamento";
import { ControleFinanceiro } from "./classes/ControleFinanceiro";
import { formatarMoeda } from '../utils/formataMoeda';

console.log("JS funcionando!");

const controle = new ControleFinanceiro();

const formulario = document.getElementById('formulario');
const saldoSpan = document.getElementById('saldo');
const listaLancamentos = document.getElementById('lista-lancamentos');

let saldo = 0;

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
    saldoSpan.textContent = `R$ ${controle.calcularSaldo().toFixed(2)}`;
    listaLancamentos.innerHTML = "";

    const todos = controle.listarLancamentos();

    todos.forEach(lancamento => {
        const linha = document.createElement('tr');
        linha.classList.add(lancamento.tipo === 'receita' ? 'receita' : 'despesa');
        linha.innerHTML = `
            <td>${lancamento.data}</td>
            <td>${lancamento.tipo.toUpperCase()}</td>
            <td>${formatarMoeda(lancamento.valor)}</td>
            <td>${lancamento.descricao}</td>
        `;
        listaLancamentos.appendChild(linha);
    });
};