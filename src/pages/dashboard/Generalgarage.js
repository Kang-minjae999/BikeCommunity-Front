// @mui
import { useTheme } from '@mui/material/styles';
import { Box, CardContent, Container, Grid, Link, Stack, Typography, Alert ,Button, Divider, Card, CardHeader} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { common } from '@mui/material/colors';
// icons
import StorefrontIcon from '@mui/icons-material/Storefront';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// sections
import Garage from './Garage';
import Appgarage from '../../sections/@dashboard/user/appmobile/Appgarage';

import MainFooter from '../../layouts/main/MainFooter';
import {
  Appmobilefirst,
  AppWelcome,
  AppWelcomefirst,
  AppFeatured,
  AppFeaturedpc,
  AppWelcomesecond,
  Appmobilesecond,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  Appcompany,
  Apppic,
  Appweather,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

export default function Generalgarage() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        {/* 데스크탑 */}
      {isDesktop && (
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appgarage />
           <Garage/>
           </Grid>


{/*            <Grid item xs={12} md={12}>
           <AppWelcomesecond />
           </Grid>
 */}
{/*           <Grid item xs={12} xl={3}>
           <Card >
              <CardHeader title='Riding'sx={{mb:1}}/>
           <Typography sx={{ml:2}}>나의 라이딩은?</Typography>
           </Card>
         </Grid> */}
{/* 
         <Grid item xs={12} xl={12}>
           <AppFeaturedpc  />
         </Grid>

 */}
{/*          <Grid item xs={12} md={4}>
           <AppWidgetSummary
             title="방문한 라이더들"
             percent={0.2}
             total={4876}
             chartColor={theme.palette.chart.blue[0]}
             chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
           />
         </Grid>

         <Grid item xs={12} md={4}>
           <AppWidgetSummary
             title="어플 다운로드 수"
             percent={-0.1}
             total={678}
             chartColor={theme.palette.chart.red[0]}
             chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
           />
         </Grid>
         <Grid item xs={12} md={4}>
           <AppWidgetSummary
             title="어플 다운로드 수"
             percent={-0.1}
             total={678}
             chartColor={theme.palette.chart.red[0]}
             chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
           />
         </Grid> */}
         </Grid>)}

          {/* 모바일 */}
          {!isDesktop && (
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appgarage />
           <Garage/>
           </Grid>
           <Grid item xs={12} md={12}>
           <MainFooter />
           </Grid>
                </Grid>)}
       
      </Container>
    </Page>
  );
}



