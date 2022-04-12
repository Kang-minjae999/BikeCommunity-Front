import { Container, Grid } from '@mui/material';

import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import Garage from './Garage';
import { Appgaragesetting } from '../../sections/@dashboard/user/appmobile';



// ----------------------------------------------------------------------

export default function GarageSetting() {
  const { themeStretch } = useSettings();
  return (
    <Page title="정비소 관리">
      <Container maxWidth={themeStretch ? false : 'lx'} disableGutters>
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appgaragesetting />
           </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



