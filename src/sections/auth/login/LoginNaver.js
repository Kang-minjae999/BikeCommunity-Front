import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------
export default function LoginNaver() {
  const { naverlogin } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const NaverloginCallback = useCallback(async () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    try {
      const user = await naverlogin(token);
      if(user?.role === 'guest' && user?.status === 200){
        navigate(`/dashboard/loginafter`)
      } else {
        navigate(`/dashboard/app`)
      }
    } catch (error) {
      console.error(error);
    }
  }, [location.hash, naverlogin, navigate]);

  useEffect(() => {
  NaverloginCallback();
  }, [NaverloginCallback]);

  return (
    <>
    </>
  );
}
