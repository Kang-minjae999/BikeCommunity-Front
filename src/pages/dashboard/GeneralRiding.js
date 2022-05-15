import { Container} from '@mui/material';
import Page from '../../components/Page';
import AppRidingHeader from '../../sections/@dashboard/general/riding/AppRidingHeader';

// ----------------------------------------------------------------------

export default function GeneralRiding() {

  return (
    <Page title="라이딩">
      <Container maxWidth='xl' disableGutters>
          <AppRidingHeader />
      </Container>
    </Page>
  );
}



