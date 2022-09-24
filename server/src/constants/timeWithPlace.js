const ND_HN = [
  {
    code: 'HH',
    name: 'Cổng chào Hải Hậu',
    time: ['4h', '6h', '9h', '12h', '15h', '18h', '21h'],
  },
  {
    code: 'XT',
    name: 'Cổng chào Xuân Trường',
    time: ['4h30', '6h30', '9h30', '12h30', '15h30', '18h30', '21h30'],
  },
  {
    code: 'ND',
    name: 'TP Nam Định',
    time: ['5h15', '7h15', '10h15', '13h15', '16h15', '19h15', '22h15'],
  },
  {
    code: 'LT',
    name: 'Liêm Tuyền (Phủ Lý - Hà Nam)',
    time: ['5h50', '7h50', '10h50', '13h50', '16h50', '19h50', '22h50'],
  },
];

const HN_ND = [
  {
    code: 'GL',
    name: 'Gia Lâm',
    time: ['9h', '15h'],
  },
  {
    code: 'YN',
    name: 'Yên Nghĩa',
    time: ['9h', '14h', '17h'],
  },
  {
    code: 'MD',
    name: 'Mỹ Đình',
    time: ['6h', '9h', '13h', '17h', '20h'],
  },
  {
    code: 'GB',
    name: 'Giáp Bát',
    time: ['6h', '9h', '12h', '15h', '17h', '21h'],
  },
  {
    code: 'NN',
    name: 'Nước Ngầm',
    time: ['6h30', '9h30', '12h30', '15h30', '17h30', '21h30'],
  },
];

export const lanes = [
  {
    code: 'ND_HN',
    name: 'Nam Định - Hà Nội',
    places: ND_HN,
  },
  {
    code: 'HN_ND',
    name: 'Hà Nội - Nam Định',
    places: HN_ND,
  },
];
