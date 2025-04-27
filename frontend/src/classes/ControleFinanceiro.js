import { Lancamento } from "./Lancamento.js";

export class ControleFinanceiro {
  #lancamentos = [];

  adicionarLancamentos(lancamento) {
    if (!(lancamento instanceof Lancamento)) {
      throw new Error("O objeto deve ser uma instância de Lancamento.");
    }
    this.#lancamentos.push(lancamento);
  }

  listarLancamentos() {
    return this.#lancamentos;
  }

  calcularSaldo() {
    return this.#lancamentos.reduce((total, lanc) => {
      return lanc.tipo === "receita"
        ? total + lanc.valor
        : total - lanc.valor;
    }, 0);
  }
}
