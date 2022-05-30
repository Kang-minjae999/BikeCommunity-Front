import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container } from '@mui/material';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import { AppOtherProfile, AppGarageProfile, AppMallProfile } from '../../sections/@dashboard/general/user';
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

  // 클럽 프로필은 삭제 예정

  useEffect(() => {
    getType()
  }, [getType])


  return (
    <Page title="라이더">
      <Container maxWidth='xl' disableGutters>
        <AppGarageProfile/>
        {profileType === 'garage' && <AppOtherProfile />}
        {/* {profileType === 'brand' && <AppBrandProfile />} */}
        {profileType === 'mall' && <AppMallProfile />}
      </Container>
    </Page>
  );
}
