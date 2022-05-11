import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// form
// hooks
import useAuth from '../../../hooks/useAuth';
import { KAKAO_REDIRECT, KAKAO_REST_API } from '../../../config';

// ----------------------------------------------------------------------
export default function LoginForm() {
  const { kakaologin } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState(null)

  const KakaologinCallbackAccess =
    async (access) => {
      try {
        const user = await kakaologin(access);
        setUser(user)
      } catch (error) {
        console.error(error);
      }
    }

  const params = new URL(document.location.toString()).searchParams;
  const getcode = params.get('code');
  const granttype = 'authorization_code';

  const KakaologinCallback = async () => {
    try {
      await axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=${granttype}&client_id=${KAKAO_REST_API}&redirect_uri=${KAKAO_REDIRECT}&code=${getcode}`,
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        )
        .then((res) => {
          KakaologinCallbackAccess(res.data.access_token);
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    KakaologinCallback();
  },[]);


  useEffect(() => {
    if(user){
      if(user?.role === 'ROLE_GUEST' && user?.status === 201){
        navigate(`/auth/loginafter`)
      } else {
        navigate(`/dashboard/app`)
      }
    }  return () => setUser();
    }, [user, navigate]);

  return (
    <>
    </>
  );
}
