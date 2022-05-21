import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from '../../utils/axiosuser';
import { AppOtherProfile, AppGarageProfile, AppBrandProfile, AppClubProfile } from '../../sections/@dashboard/general/user';
// ----------------------------------------------------------------------

export default function GeneralProfile() {
  const { nickname } = useParams();
  const [profileType, setProfileType] = useState();

  const getType = useCallback( async () => {
    try{
      const response = await axios.get('url', nickname)
      setProfileType(response.data.data)
    } catch {
      // alert('연결이 이상해용~!')
    }
  }, [nickname])

  useEffect(() => {
    getType()
  }, [getType])


  return (
    <>
    <AppGarageProfile />
    {profileType === 'garage' && <AppGarageProfile />}
    {profileType === 'brand' && <AppBrandProfile />}
    {profileType === 'club' && <AppClubProfile />}
    </>
  );
}
