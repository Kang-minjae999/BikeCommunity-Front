import axios from 'axios';
// config
import { HOST_API } from '../config';
import { access, refresh, setSessionAccess, setSessionRefresh } from './jwt';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const isValid = async () => {
  try {
    const response = await axios.get('/users/access-token', {
      headers: {
        accessToken: access,
        refreshToken: refresh,
      },
    });
    if(response){
      setSessionAccess(response.headers.accesstoken);
      setSessionRefresh(response.headers.refreshtoken);
    }
  } catch (error) {
    console.error(error);
  }
};

export default {axiosInstance, isValid};
