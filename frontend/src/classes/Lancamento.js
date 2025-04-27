export class Lancamento {
    constructor(data, tipo, valor, descricao) {
      // Validação de tipo
      if (tipo !== "receita" && tipo !== "despesa") {
        throw new Error("Tipo inválido. Use 'receita' ou 'despesa'.");
      }
  
      // Validação de valor
      if (isNaN(valor) || valor <= 0) {
        throw new Error("Valor deve ser um número positivo.");
      }
  
      // Atribuições
      this.data = data;
      this.tipo = tipo;
      this.valor = Number(valor);
      this.descricao = descricao;
    }
  }
  