import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axiosuser';
import { isValidToken, setSession } from '../utils/jwt';

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
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/users', {
            headers: {
              authorization: accessToken,
            },
          });
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
    const accessToken = response.headers.authorization;
    setSession(accessToken);
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
    const accessToken = response.headers.authorization;
    setSession(accessToken);
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
    const accessToken = response.headers.authorization;
    setSession(accessToken);
    dispatch({
      type: 'NAVERLOGIN',
      payload: {
        user,
      },
    });
    return user;
  };

  const afterlogin = async (users) => {
    const token = localStorage.getItem('accessToken')
    const response = await axios.put('/users/oauth', 
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
        Authorization:token
      }
    }
    );
    const user = response.data;
    const accessToken = response.headers.authorization;
    setSession(accessToken);
    dispatch({
      type: 'AFTERLOGIN',
      payload: {
        user,
      },
    });
  };

  const register = async (email, password, name, nickname, birthday, phoneNumber, address) => {
    const response = await axios.post('/join', {
      email,
      password,
      name,
      nickname,
      birthday,
      phoneNumber,
      address,
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
    const accessToken = window.localStorage.getItem('accessToken');
    await axios.get('/logout', {
      headers: {
        authorization: accessToken,
      },
    });
    setSession(null);
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
