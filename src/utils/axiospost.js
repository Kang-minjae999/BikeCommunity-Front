import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `${HOST_API}/post-service`,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;



/* const accessToken = window.localStorage.getItem('accessToken');
await axios.get('/logout', {
  headers: {
    Authorization: accessToken,
  },
}) */
