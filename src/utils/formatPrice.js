/**
 * 2500 -> "2.500 TL"
 */
export const formatPrice = (amount) => {
  if (amount === null || amount === undefined) return "-";
  return (
    new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount) + " TL"
  );
};

export default formatPrice;
