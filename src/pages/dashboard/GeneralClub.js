// @mui
import { Container, Grid} from '@mui/material';
import { Appclub, AppRidingClub } from '../../sections/@dashboard/general/app';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sectionss
import MainFooter from '../../layouts/main/MainFooter';
import Club from './Club';

// ----------------------------------------------------------------------

export default function GeneralClub() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <AppRidingClub />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MainFooter />
            </Grid>
          </Grid>
        </Container>
    </Page>
  );
}
