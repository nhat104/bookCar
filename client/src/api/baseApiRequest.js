import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_URL;

const baseApiRequest = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
baseApiRequest.interceptors.request.use((config) => {
  const newConfig = { ...config };
  // set token
  if (!!newConfig.headers?.common) {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      newConfig.headers.common['Authorization'] = `Bearer ${access_token}`;
    }
  }
  return newConfig;
});

baseApiRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      // remove token
      // console.log(error.response.data.messages[0].message);
      // toast.error(error.response.data.messages[0].message);
      // const { actions } = useAllSalesSlice();
      // store.dispatch(actions.getAllSalesFailed());
    }
    throw error;
  }
);

export default baseApiRequest;
