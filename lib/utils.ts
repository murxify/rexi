import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getShiftDuration = (duration: number) => {
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const hoursString = hours > 0 ? `${hours}h` : '';
  const minutesString = minutes > 0 ? `${minutes}m` : '';

  return `${hoursString} ${minutesString}`;
};

export const formatCurrency = (
  amount: number,
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined
) =>
  new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    notation: notation ? `${notation}` : 'standard',
  }).format(amount);

export const getHourlyRate = (duration: number, profit: number) => {
  const hourlyRate = profit / (duration / (1000 * 60 * 60));
  return formatCurrency(hourlyRate);
};
