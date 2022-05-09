// @mui
import { Container} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AppUserMenu } from '../../sections/@dashboard/general/app';
// ----------------------------------------------------------------------

export default function GeneralUserMenu() {
  const { themeStretch } = useSettings();
 
  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth={themeStretch ? false : 'xl'}>
         <AppUserMenu />  
      </Container>
    </Page>
  );
}



