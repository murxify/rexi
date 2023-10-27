export const getShiftDuration = (duration: number) => {
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const hoursString = hours > 0 ? `${hours}h` : '';
  const minutesString = minutes > 0 ? `${minutes}m` : '';

  return `${hoursString} ${minutesString}`;
};
