// Lưu thông tin tuyến xe, thời gian đi, thông tin người đặt xe

export const initState = {
  placeFrom: '',
  placeTo: '',
  chooseVehicle: {
    id: 0,
  },
  time: {
    hour: '',
    date: '',
  },
  userInfo: {
    name: '',
    phone: '',
    address: '',
    cccd: '',
    note: '',
  },
};

const SET_PLACE_FROM = 'SET_PLACE_FROM';
const SET_PLACE_TO = 'SET_PLACE_TO';
const SET_VEHICLE = 'SET_VEHICLE';
const SET_USER_INFO = 'SET_USER_INFO';
const SET_TIME = 'SET_TIME';

export const actions = {
  setPlaceFrom: (payload) => ({
    type: SET_PLACE_FROM,
    payload,
  }),
  setPlaceTo: (payload) => ({
    type: SET_PLACE_TO,
    payload,
  }),
  setVehicle: (payload) => ({
    type: SET_VEHICLE,
    payload,
  }),
  setTime: (payload) => ({
    type: SET_TIME,
    payload,
  }),
  setUser: (payload) => ({
    type: SET_USER_INFO,
    payload,
  }),
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PLACE_FROM:
      return {
        ...state,
        placeFrom: action.payload,
      };
    case SET_PLACE_TO:
      return {
        ...state,
        placeTo: action.payload,
      };
    case SET_VEHICLE:
      return {
        ...state,
        chooseVehicle: action.payload,
      };
    case SET_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
