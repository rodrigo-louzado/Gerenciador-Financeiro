export const selectContas = (contas) => {
  return contas.map((conta) => {return conta});
}

export const contasTotal = (contas) => {
  let total = 0;
  contas.map((conta) => total = total + conta.saldo);
  return total;
}

export const selectMovimentacoes = (movimentacoes) => {
  return movimentacoes.map((movimentacao) => {return movimentacao});
}

export const movimentacoesTotal = (movimentacoes) => {
  let total = 0;
  movimentacoes.map((movimentacao) => total = total + movimentacao.valor);
  return total;
}

export const totalReceitas = (movimentacoes) => {
  let total = 0;
  movimentacoes.map((movimentacao) => {if(movimentacao.tipo === 'Receita') total = total + movimentacao.valor});
  return total;
}

export const totalDespesas = (movimentacoes) => {
  let total = 0;
  movimentacoes.map((movimentacao) => {if(movimentacao.tipo === 'Despesa') total = total + movimentacao.valor});
  return total;
}

export const selectContasPorMovimentacao = (contas, movimentacao) => {
  return contas.find((conta) => conta.id === movimentacao);
}