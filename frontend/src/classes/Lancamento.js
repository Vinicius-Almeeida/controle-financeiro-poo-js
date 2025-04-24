export class Lancamento {
    constructor(data, tipo, valor, descricao) {
        if (tipo !== "receita" && tipo !== "despesa") {
            throw new Error("Tipo inválido. Use 'receita' ou 'despesa'.");
        }

        if (valor <= 0) {
            throw new Error("O valor precisa ser maior que zero.");
        }

        this.data = data;
        this.tipo = tipo;
        this.valor = valor;
        this.descricao = descricao;
    }
}
