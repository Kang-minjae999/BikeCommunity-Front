import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { IsValid } from '../utils/jwt';

// ----------------------------------------------------------------------

export default function AccessTime() {
  const { accessTime } = useAuth();

  const { pathname } = useLocation();

  useEffect(() => {
    IsValid(accessTime)
    // eslint-disable-next-line
  }, [pathname]);

  return null;
}
