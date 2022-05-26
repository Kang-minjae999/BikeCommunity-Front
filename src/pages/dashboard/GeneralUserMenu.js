// @mui
import { Container} from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { AppUserMenu } from '../../sections/@dashboard/general/user';
// ----------------------------------------------------------------------

export default function GeneralUserMenu() {
 
  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth='xl'>
         <AppUserMenu />  
      </Container>
    </Page>
  );
}



