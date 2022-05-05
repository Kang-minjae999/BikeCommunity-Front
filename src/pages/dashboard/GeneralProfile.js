import { useCallback, useEffect, useState } from 'react';
import UserProfile from './UserProfile'
import GarageProfile from './GarageProfile'
import axiosInstance from '../../utils/axiosuser';
// ----------------------------------------------------------------------

export default function GeneralProfile() {
  const [profileType, setProfileType] = useState()

  const getType = useCallback( async () => {
    try{
      const response = await axiosInstance.get('url')
      setProfileType(response.data.data)
    } catch {
      // alert('연결이 이상해용~!')
    }
  }, [])

  useEffect(() => {
    getType()
  }, [getType])
  
  return (
    <>
    {profileType === 'user' && <UserProfile />}
    {profileType === 'garage' && <GarageProfile />}
    {profileType === 'brand' && <GarageProfile />}
    </>
  );
}
