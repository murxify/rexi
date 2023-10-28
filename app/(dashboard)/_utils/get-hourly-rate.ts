import { formatCurrency } from './format-currency';

export const getHourlyRate = (duration: number, profit: number) => {
  const hourlyRate = profit / (duration / (1000 * 60 * 60));
  return formatCurrency(hourlyRate);
};
