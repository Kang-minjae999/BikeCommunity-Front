import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ScrollToTop() {
  const { pathname } = useLocation();

  const isProfile = pathname.includes('/dashboard/garages')

  const isGarage = pathname.includes('/dashboard/profile')

  useEffect(() => {
    if(!isProfile && !isGarage)
    window.scrollTo(0, 0);
  }, [isProfile, isGarage, pathname]);

  return null;
}
