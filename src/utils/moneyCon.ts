const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function converterValor<T extends { valor: number }>(item: T) {
  const { valor, ...rest } = item;
  const valorFormatado = formatter.format(valor / 100);
  const output = { ...rest, valor: valorFormatado };
  return output;
}

export function converterValorEmArr<T extends { valor: number }>(arr: T[]) {
  return arr.map((i) => ({
    ...i,
    valor: formatter.format(i.valor / 100),
  }));
}
