import { ControleFinanceiro } from './ControleFinanceiro.js';
import { Lancamento } from './Lancamento.js';

//const teste = new Lancamento('26/03/2025', 'receita', 1000, 'Teste de entrada');
//console.log(teste);

const controle = new ControleFinanceiro();

const lancamentoValido = new Lancamento('03/07/2025', 'receita', 1500, 'Venda de milho');
const lancamentoInvalido =  new Lancamento( "03/07/2025", "despesa", 300, "Compra Milho" );

try {
    controle.adicionarLancamentos(lancamentoValido);
    console.log("Lançamento Válido adicionado com sucesso!!");
} catch (e) {
    console.error("Erro no lançamento Válido", e.message);
};

try {
    controle.adicionarLancamentos(lancamentoInvalido);
    console.log("Lançamento inválido adicionado com sucesso!!");
} catch (e) {
    console.error("Erro no lançamento Inválido", e.message);
}

console.log("Saldo atual: ", controle.calcularSaldo());
console.log("Receita: ")
console.log(controle.listarReceitas());
console.log("Despesa: ")
console.log(controle.listarDespesas());

