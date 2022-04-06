import { Container, Grid} from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import AppRidingHeader from '../../sections/@dashboard/general/app/AppRidingHeader';

// ----------------------------------------------------------------------

export default function GeneralRiding() {
  const { themeStretch } = useSettings();

  return (
    <Page title="라이딩">
      <Container maxWidth={themeStretch ? false : 'xl'} disableGutters>
          <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
          <AppRidingHeader />
          </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



