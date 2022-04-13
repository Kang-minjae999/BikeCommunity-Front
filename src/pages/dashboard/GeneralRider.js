import { Container, Grid} from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import AppRiderHeader from '../../sections/@dashboard/general/app/AppRiderHeader';

// ----------------------------------------------------------------------

export default function GeneralRider() {
  const { themeStretch } = useSettings();

  return (
    <Page title="라이더">
      <Container maxWidth={themeStretch ? false : 'xl'} disableGutters>
          <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
          <AppRiderHeader />
          </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



