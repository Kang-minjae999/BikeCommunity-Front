import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------
export default function LoginNaver() {
  const { naverlogin } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const NaverloginCallback = async () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    try {
      const user = await naverlogin(token);
      console.log('네이버 로그인' , user)
      if(user?.role === 'ROLE_GUEST' && user?.status === 201){
        navigate(`/dashboard/loginafter`)
      } else {
        navigate(`/dashboard/app`)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
  NaverloginCallback();
  }, []);

  return (
    <>
    </>
  );
}
