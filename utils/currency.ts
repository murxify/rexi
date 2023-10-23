export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-SE', {
    style: 'currency',
    currency: 'SEK',
  }).format(amount);
