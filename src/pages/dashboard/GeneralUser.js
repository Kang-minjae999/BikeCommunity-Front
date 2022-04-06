// @mui
import { Container, Grid} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections

import MainFooter from '../../layouts/main/MainFooter';
import { AppUserHeader } from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

export default function GeneralUser() {
  const { themeStretch } = useSettings();


  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={1}>
        <Grid item xs={12} lg={12} >
         <AppUserHeader />  
        </Grid>  
         </Grid>
      </Container>
    </Page>
  );
}



