import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ScrollToTop() {
  const { pathname } = useLocation();

  const isClub = pathname.includes('/dashboard/club/room')

  const isGarage = pathname.includes('/dashboard/profile')

  useEffect(() => {
    if(!isClub && !isGarage)
    window.scrollTo(0, 0);
  }, [isClub, isGarage, pathname]);

  return null;
}
