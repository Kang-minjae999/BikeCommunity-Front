// @mui
import { Box,  Container, Divider, Grid} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections

import MainFooter from '../../layouts/main/MainFooter';
import {
  AppFeatured,
  AppFeaturedpc,
  AppFeaturedpc2,
  AppFeaturedpc3,
} from '../../sections/@dashboard/general/app';
import GeneralAppMarket from './GeneralAppMarket';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();

  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={1}>
         <Grid item xs={8} xl={8} sx={{mt:{xs:1, lg:8}}}>
          <AppFeaturedpc  />
           <Box sx={{mb:1}}/> 
          <AppFeaturedpc3  />
         </Grid>
         <Grid item xs={4} xl={4} sx={{mt:{xs:1, lg:8}}}>
         <AppFeaturedpc2  />
         </Grid> 
        <Grid item xs={12} lg={12} >
         <AppFeatured  />
         </Grid>  
         <Grid item xs={12} lg={12}>
          <Divider sx={{my:3}}/>
          <GeneralAppMarket />
         </Grid>
         <Grid item xs={12} lg={12}>
          <MainFooter />
         </Grid>
         </Grid>
      </Container>
    </Page>
  );
}



