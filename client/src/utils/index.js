export const toVND = (price) =>
  Number(price).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
