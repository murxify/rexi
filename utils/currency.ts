export const formatCurrency = (
  amount: number,
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined
) =>
  new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    notation: notation ? `${notation}` : 'standard',
  }).format(amount);
