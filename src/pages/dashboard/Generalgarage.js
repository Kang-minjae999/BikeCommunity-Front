// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid} from '@mui/material';

import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// sections
import Garage from './Garage';
import Appgarage from '../../sections/@dashboard/user/appmobile/Appgarage';

import MainFooter from '../../layouts/main/MainFooter';


// ----------------------------------------------------------------------

export default function Generalgarage() {
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        {/* 데스크탑 */}
      {isDesktop && (
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appgarage />
           <Garage/>
           </Grid>
         </Grid>)}

          {/* 모바일 */}
          {!isDesktop && (
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appgarage />
           <Garage/>
           </Grid>
           <Grid item xs={12} md={12}>
           <MainFooter />
           </Grid>
                </Grid>)}
       
      </Container>
    </Page>
  );
}



