// @mui
import { Container, Grid} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections

import MainFooter from '../../layouts/main/MainFooter';
import { AppHeaderSpace, AppHomeHeader } from '../../sections/@dashboard/general/app';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg')

  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={1}>
        <Grid item xs={12} lg={12} >
         <AppHomeHeader /> 
         {!isDesktop && <AppHeaderSpace />}
        </Grid>  
         <Grid item xs={12} lg={12}>
          <MainFooter />
         </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



