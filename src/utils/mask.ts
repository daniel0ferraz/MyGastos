export const maskCurrency = (value: string) => {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
  return value;
};

export const maskDate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1');
};

// '19.898,1298' ToNumber('19898.1298') regex function
export const toNumber = (value: string) => {
  value = value?.replace(/\D/g, '');
  value = value?.replace(/(\d)(\d{2})$/, '$1.$2');
  value = value?.replace(/(\d)(\d{2})$/, '$1.$2');
  value = value?.replace(/(\d{4})(\d)/, '$1');
  return value;
};
