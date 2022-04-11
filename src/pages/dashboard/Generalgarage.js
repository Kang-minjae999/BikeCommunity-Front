import { Container, Grid } from '@mui/material';

import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import Garage from './Garage';
import Appgarage from '../../sections/@dashboard/user/appmobile/Appgarage';



// ----------------------------------------------------------------------

export default function GeneralGarage() {
  const { themeStretch } = useSettings();
  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'lx'} disableGutters>
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appgarage />
           <Garage/>
           </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



