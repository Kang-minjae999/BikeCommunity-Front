// @mui
import { useTheme } from '@mui/material/styles';
import { Box, CardContent, Container, Grid, Link, Stack, Typography, Alert ,Button, Divider, Card, CardHeader} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { common } from '@mui/material/colors';
// icons
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Appclub } from '../../sections/@dashboard/user/appmobile';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// sectionss

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
import BlogPosts from './BlogPosts';
import BlogPostsgeneral from './BlogPostsgeneral';
import Club from './Club';

// ----------------------------------------------------------------------

export default function Generalpost() {
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
          <Appclub/>
          <Club />
           </Grid> 
         <Grid item xs={12} md={12} lg={12}>
          <MainFooter />
         </Grid>
         </Grid>)}

          {/* 모바일 */}
          {!isDesktop && (
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appclub/>
           
          <Club />
           </Grid>
           <Grid item xs={12} md={12}>
           <MainFooter />
           </Grid>
          </Grid>)}

      </Container>
    </Page>
  );
}



