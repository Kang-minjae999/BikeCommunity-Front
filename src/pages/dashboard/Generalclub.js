// @mui
import { Container, Grid} from '@mui/material';
import { Appclub } from '../../sections/@dashboard/user/appmobile';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// sectionss
import MainFooter from '../../layouts/main/MainFooter';
import Club from './Club';

// ----------------------------------------------------------------------

export default function Generalclub() {
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        {/* 데스크탑 */}
        {isDesktop && (
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Appclub />
              <Club />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MainFooter />
            </Grid>
          </Grid>
        )}

        {/* 모바일 */}
        {!isDesktop && (
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Appclub />

              <Club />
            </Grid>
            <Grid item xs={12} md={12}>
              <MainFooter />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
