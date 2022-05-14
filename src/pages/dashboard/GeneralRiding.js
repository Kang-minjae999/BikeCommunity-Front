import { Container, Grid} from '@mui/material';
import Page from '../../components/Page';
import AppRidingHeader from '../../sections/@dashboard/general/riding/AppRidingHeader';

// ----------------------------------------------------------------------

export default function GeneralRiding() {

  return (
    <Page title="라이딩">
      <Container maxWidth='xl' disableGutters>
          <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
          <AppRidingHeader />
          </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



