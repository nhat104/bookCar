import baseApiRequest from './baseApiRequest';

const placeApi = {
  async getByCity(body) {
    const url = '/get-place';
    const res = await baseApiRequest.post(url, body);
    return res.data;
  },
};

export default placeApi;
