import { ControleFinanceiro } from "./classes/ControleFinanceiro";

const controle = new ControleFinanceiro();
const tabelaConferencia = document.getElementById('tabela-conferencia');

function carregarTodosLancamentos() {
    const todos = controle.listarLancamentos();

    todos.forEach(lancamento => {
        const linha = documento.createElement('tr');
        linha.classList.add(lancamento.tipo === 'receita' ? 'receita' : 'despesa');

        linha.innerHTML = ` 
        <td>${lancamento.data}</td>
        <td>${lancamento.tipo.toUpperCase()}</td>
        <td>${Number(lancamento.valor).toFixed(2)}</td>
        <td>${lancamento.descricao}</td>
        `;

        tabelaConferencia.appendChild(linha);
    })
}

carregarTodosLancamentos();