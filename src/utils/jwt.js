// import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  // ----------------------------------------------------------------------

  // const decoded = jwtDecode(accessToken);
  // const currentTime = Date.now() / 1000;

  // return decoded.exp > currentTime;
  return true;
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

// ----------------------------------------------------------------------

const setSessionAccess = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accesstoken', accessToken);
    //  axios.defaults.headers.common.Authorization = `${accessToken}`; 
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accesstoken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const setSessionRefresh = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem('refreshtoken', refreshToken);
    //  axios.defaults.headers.common.Authorization = `${refreshToken}`; 
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('refreshtoken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const access = window.localStorage.getItem('accesstoken');
const refresh = window.localStorage.getItem('refreshtoken');

export { isValidToken, setSessionRefresh, setSessionAccess, verify, sign, access, refresh };
