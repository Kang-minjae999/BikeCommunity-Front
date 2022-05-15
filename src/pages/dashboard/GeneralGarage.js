import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import {Appgarage} from '../../sections/@dashboard/general/app';



// ----------------------------------------------------------------------

export default function GeneralGarage() {
  return (
    <Page title="GARAGE">
      <Container maxWidth='xl' disableGutters>
           <Appgarage />
      </Container>
    </Page>
  );
}



