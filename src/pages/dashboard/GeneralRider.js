import { Container } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import AppRiderHeader from '../../sections/@dashboard/general/rider/AppRiderHeader';

// ----------------------------------------------------------------------

export default function GeneralRider() {
  const { themeStretch } = useSettings();

  return (
    <Page title="라이더">
      <Container maxWidth={themeStretch ? false : 'xl'} disableGutters>
          <AppRiderHeader />
      </Container>
    </Page>
  );
}



