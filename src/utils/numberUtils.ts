export const formatPercentage = (value: number, initialInvestment: number): string => {
  if (initialInvestment === 0) {
    return "N/A";
  }
  return `${(value * 100).toFixed(2)}%`;
};

export const formatNumber = (amount: string | number, decimalPlaces: number = 2) => {
  if (!amount) return amount as string;

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  };

  return new Intl.NumberFormat("en-US", options).format(+amount || 0);
};

export const formatAmountUtil = (amount: string | number, decimalPlaces = 2) => {
  return Number(amount)
    .toFixed(decimalPlaces)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
