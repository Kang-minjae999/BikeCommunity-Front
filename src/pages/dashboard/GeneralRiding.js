import { Container, Grid} from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import Appriding from '../../sections/@dashboard/general/app/Appriding';

// ----------------------------------------------------------------------

export default function GeneralRiding() {
  const { themeStretch } = useSettings();

  return (
    <Page title="라이딩">
      <Container maxWidth={themeStretch ? false : 'md'}>
          <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
          <Appriding />
          </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



