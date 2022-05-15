import { Container} from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import AppMotoHeader from '../../sections/@dashboard/general/motocycle/AppMotoHeader';

// ----------------------------------------------------------------------

export default function GeneralRider() {
  const { themeStretch } = useSettings();

  return (
    <Page title="라이더">
      <Container maxWidth={themeStretch ? false : 'xl'} disableGutters>
          <AppMotoHeader />
      </Container>
    </Page>
  );
}



