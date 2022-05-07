import { useCallback, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// form
// hooks
import useAuth from '../../../hooks/useAuth';
import { KAKAO_REDIRECT, KAKAO_REST_API } from '../../../config';

// ----------------------------------------------------------------------
export default function LoginForm() {
  const { kakaologin } = useAuth();

  const navigate = useNavigate();

  const KakaologinCallbackAccess = useCallback(
    async (access) => {
      try {
        const user = await kakaologin(access);
        if(user?.role === 'ROLE_GUEST' && user?.status === 201){
          navigate(`/auth/loginafter`)
        } else {
          navigate(`/dashboard/app`)
        }
      } catch (error) {
        console.error(error);
      }
    },
    [kakaologin, navigate]
  );

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
  }, []);


  return (
    <>
    </>
  );
}
