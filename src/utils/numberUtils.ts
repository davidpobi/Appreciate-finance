export const formatPercentage = (value: number, initialInvestment: number): string => {
  if (initialInvestment === 0) {
    return "N/A";
  }
  return `${(value * 100).toFixed(2)}%`;
};
