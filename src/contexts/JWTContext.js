import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axiosuser';
import { setSessionAccess, setSessionRefresh } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {},
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  KAKAOLOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  NAVERLOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  AFTERLOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
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
        if (access && refresh) {
          const response = await axios.get('/users', {
            headers: {
              accesstoken: access,
              refreshtoken: refresh,
            },
          });

          if(response.headers.accessToken){
            setSessionAccess(response.headers.accessToken);
            setSessionRefresh(response.headers.refreshToken);
          }

          const user = response.data.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
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
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/login', {
      email,
      password,
    });
    const user = response.data;
    const access = response.headers.accesstoken;
    const refresh = response.headers.refreshtoken;
    setSessionAccess(access);
    setSessionRefresh(refresh);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const kakaologin = async (access) => {
    const response = await axios.get('/login/oauth2/kakao', { headers: { Authorization: `${access}` } });
    const user = {...response.data, status:response.status}
    const accessT = response.headers.accesstoken;
    const refresh = response.headers.refreshtoken;
    setSessionAccess(accessT);
    setSessionRefresh(refresh);
    dispatch({
      type: 'KAKAOLOGIN',
      payload: {
        user,
      },
    });
    return user;
  };

  const naverlogin = async (access) => {
    const response = await axios.get('/login/oauth2/naver', { headers: { Authorization: `${access}` } });
    const user = {...response.data, status:response.status}
    const accessT = response.headers.accesstoken;
    const refresh = response.headers.refreshtoken;
    setSessionAccess(accessT);
    setSessionRefresh(refresh);
    dispatch({
      type: 'NAVERLOGIN',
      payload: {
        user,
      },
    });
    return user;
  };

  const afterlogin = async (users) => {
    const accessT = window.localStorage.getItem('accesstoken');
    const refreshT = window.localStorage.getItem('refreshtoken');
    const response = await axios.put('/users-oauth', 
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
    setSessionAccess(access);
    setSessionRefresh(refresh);
    dispatch({
      type: 'AFTERLOGIN',
      payload: {
        user,
      },
    });
  };

  const register = async (email, password, name, nickname, birthday, phoneNumber, address, sex) => {
    const response = await axios.post('/join', {
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
    await axios.get('/logout', {
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
