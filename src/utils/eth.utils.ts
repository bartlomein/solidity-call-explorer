export const formatValue = (value: string) => {
  if (!value || value === "0x0") return "0.0000";
  try {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    return numValue.toFixed(4);
  } catch {
    return value;
  }
};

export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};
