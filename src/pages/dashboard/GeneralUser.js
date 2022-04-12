import { useEffect } from 'react';
import { useNavigate } from 'react-router';
// @mui
import { Container, Grid} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AppUserHeader } from '../../sections/@dashboard/general/app';
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

export default function GeneralUser() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const navigate = useNavigate('up', 'lg')
  
  useEffect(() => {
    if(user?.role === 'garage'){
      navigate('/dashboard/garage/setting')
    }
  }, [user, navigate])
  

  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth={themeStretch ? false : 'md'}>
        <Grid container spacing={1}>
        <Grid item xs={12} lg={12} >
         <AppUserHeader />  
        </Grid>  
         </Grid>
      </Container>
    </Page>
  );
}



