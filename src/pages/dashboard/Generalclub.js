// @mui
import { Container, Grid} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sectionss
import MainFooter from '../../layouts/main/MainFooter';
// ----------------------------------------------------------------------

export default function GeneralClub() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <MainFooter />
            </Grid>
          </Grid>
        </Container>
    </Page>
  );
}
