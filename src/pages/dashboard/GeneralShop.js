// @mui
import { Container, Grid} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AppShopHeader } from '../../sections/@dashboard/general/shop';

// ----------------------------------------------------------------------

export default function Generalshop() {
  const { themeStretch } = useSettings();
  
  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={1}>
        <Grid item xs={12} lg={12} >
         <AppShopHeader />  
        </Grid>  
         </Grid>
      </Container>
    </Page>
  );
}



