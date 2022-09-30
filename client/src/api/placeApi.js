import baseApiRequest from './baseApiRequest';

const placeApi = {
  getByCity(body) {
    const url = '/get-place';
    return baseApiRequest.post(url, body);
  },
};

export default placeApi;
