function converter(currency) {
  return new Intl.NumberFormat(`en-${currency.substr(0, 2)}`, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    useGrouping: false,
    notation: 'standard',
  });
}

export default converter;
