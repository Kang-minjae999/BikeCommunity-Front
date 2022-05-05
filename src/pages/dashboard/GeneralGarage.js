import { Container, Grid } from '@mui/material';

import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {Appgarage} from '../../sections/@dashboard/general/app';



// ----------------------------------------------------------------------

export default function GeneralGarage() {
  const { themeStretch } = useSettings();
  return (
    <Page title="GARAGE">
      <Container maxWidth={themeStretch ? false : 'xl'} disableGutters>
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appgarage />
           </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



