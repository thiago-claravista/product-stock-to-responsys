const convertVtexCurrencyToNumber = (value: number) => {
  return Number(String(value).replace(/(\d{2})$/, ".$1"));
};

export default convertVtexCurrencyToNumber;
