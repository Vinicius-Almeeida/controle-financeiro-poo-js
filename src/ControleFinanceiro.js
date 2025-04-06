import { Lancamento } from "./Lancamento.js";

export class ControleFinanceiro {
    #lancamentos
    constructor(){
        this.#lancamentos = [];
    }

    adicionarLancamentos(lancamentos) {

        if(!(lancamentos instanceof Lancamento)){
            throw new Error("Só é permitido adicionar Objeto da classe Lancamento. ");
        } 

        this.#lancamentos.push(lancamentos);

    }

    // Cria uma variável saldo = 0
    // Percorre o array com reduce()
    // Se tipo === 'receita', soma ao saldo
    // Se tipo === 'despesa', subtrai do saldo
    // Retorna o saldo

    calcularSaldo() {
        const saldo = this.#lancamentos.reduce((acc, lancamento) => {
            const valor = Number(lancamento.valor); 
            return lancamento.tipo === 'receita'
            ? acc + valor
            : acc - valor;
        }, 0);

        return saldo;

    }

     // Usa filter() no array #lancamentos
     // Retorna apenas os objetos onde lancamento.tipo === 'receita'
    listarReceitas() {
        return this.#lancamentos.filter(lanc => lanc.tipo === 'receita');
    }

    listarDespesas() {
        return this.#lancamentos.filter(lanc => lanc.tipo === 'despesa');
    }
};
