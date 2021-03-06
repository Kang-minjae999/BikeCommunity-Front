import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { setSessionAccess, setSessionRefresh } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {},
  accessTime: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, accessTime } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      accessTime
    };
  },
  LOGIN: (state, action) => {
    const { user, accessTime } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      accessTime
    };
  },
  KAKAOLOGIN: (state, action) => {
    const { user, accessTime } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      accessTime
    };
  },
  NAVERLOGIN: (state, action) => {
    const { user, accessTime } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      accessTime
    };
  },
  AFTERLOGIN: (state, action) => {
    const { user, accessTime } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      accessTime
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    accessTime:null,
  }),

  REGISTER: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  naverlogin: () => Promise.resolve(),
  kakaologin: () => Promise.resolve(),
  afterlogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const access = window.localStorage.getItem('accesstoken');
        const refresh = window.localStorage.getItem('refreshtoken');
          if (access) {
          const response = await axios.get('/user-service/users', {
            headers: {
              accesstoken: access,
              refreshtoken: refresh,
            },
          });
          setSessionAccess(response.headers.accesstoken);
          setSessionRefresh(response.headers.refreshtoken);
          const user = response.data.data;
          const accessTime = new Date().getTime();
          console.log(accessTime)
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              accessTime
            },
          });         
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
              accessTime: null
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            accessTime: null
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/user-service/login', {
      email,
      password,
    });
    const user = response.data;
    const access = response.headers.accesstoken;
    const refresh = response.headers.refreshtoken;
    const accessTime = new Date().getTime();
    setSessionAccess(access);
    setSessionRefresh(refresh);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        accessTime
      },
    });
  };

  const kakaologin = async (access) => {
    const response = await axios.get('/user-service/login/oauth2/kakao', { headers: { Authorization: `${access}` } });
    const user = {...response.data, status:response.status}
    const accessT = response.headers.accesstoken;
    const refresh = response.headers.refreshtoken;
    const accessTime = new Date().getTime();
    setSessionAccess(accessT);
    setSessionRefresh(refresh);
    dispatch({
      type: 'KAKAOLOGIN',
      payload: {
        user,
        accessTime
      },
    });
    return user;
  };

  const naverlogin = async (access) => {
    const response = await axios.get('/user-service/login/oauth2/naver', { headers: { Authorization: `${access}` } });
    const user = {...response.data, status:response.status}
    const accessT = response.headers.accesstoken;
    const refresh = response.headers.refreshtoken;
    const accessTime = new Date().getTime();
    setSessionAccess(accessT);
    setSessionRefresh(refresh);
    dispatch({
      type: 'NAVERLOGIN',
      payload: {
        user,
        accessTime
      },
    });
    return user;
  };

  const afterlogin = async (users) => {
    const accessT = window.localStorage.getItem('accesstoken');
    const refreshT = window.localStorage.getItem('refreshtoken');
    const response = await axios.put('/user-service/users-oauth', 
    {
      nickname:users.nickname,
      name:users.name,
      phoneNumber: users.phoneNumber,
      birthday:users.birthday,
      sex:users.sex,
      socialPk:users.socialPk,
      socialType:users.socialType,
    },
    {
      headers:
      {
        accesstoken:accessT,
        refreshtoken:refreshT
      }
    }
    );
    const user = response.data.data;
    const access = response.headers.accesstoken;
    const refresh = response.headers.refreshtoken;
    const accessTime = new Date().getTime();
    setSessionAccess(access);
    setSessionRefresh(refresh);
    dispatch({
      type: 'AFTERLOGIN',
      payload: {
        user,
        accessTime
      },
    });
  };

  const register = async (email, password, name, nickname, birthday, phoneNumber, address, sex) => {
    const response = await axios.post('/user-service/join', {
      email,
      password,
      name,
      nickname,
      birthday,
      phoneNumber,
      address,
      sex
    });
    const user = response.data;
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    const accessT = window.localStorage.getItem('accesstoken');
    const refreshT = window.localStorage.getItem('refreshtoken');
    await axios.get('/user-service/logout', {
      headers:
      {
        accesstoken:accessT,
        refreshtoken:refreshT
      }
    });
    setSessionAccess(null);
    setSessionRefresh(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        kakaologin,
        naverlogin,
        afterlogin,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
