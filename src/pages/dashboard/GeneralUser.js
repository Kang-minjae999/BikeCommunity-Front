import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { AppUserHeader } from '../../sections/@dashboard/general/user';
// ----------------------------------------------------------------------

export default function GeneralUser() {
 
  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth='xl'>
         <AppUserHeader />  
      </Container>
    </Page>
  );
}



