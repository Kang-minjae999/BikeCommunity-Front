import { verify, sign } from 'jsonwebtoken';
//
import axios from './axiosuser';

// ----------------------------------------------------------------------
const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  return true;
};

const IsValid = async (accessTime) => {
  const nowTime = new Date().getTime();
  if(accessTime && accessTime + 2400000 < nowTime){
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
  } 
};

// ----------------------------------------------------------------------

const setSessionAccess = (accesstoken) => {
  if (accesstoken) {
    localStorage.setItem('accesstoken', accesstoken);
  }
};

const setSessionRefresh = (refreshtoken) => {
  if (refreshtoken) {
    localStorage.setItem('refreshtoken', refreshtoken);
    }
  };

const access = window.localStorage.getItem('accesstoken');
const refresh = window.localStorage.getItem('refreshtoken');

export { isValidToken, IsValid, setSessionRefresh, setSessionAccess, verify, sign, access, refresh };
