// @mui
import { useState,useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, CardContent, Container, Grid,Card, Link, Stack, Typography, Alert ,Button, Divider, CardHeader} from '@mui/material';
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
import {
  Appmobilefirst,
  AppWelcome,
  AppWelcomefirst,
  AppFeatured,
  AppWelcomesecond,
  Appmobilesecond,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  Appcompany,
  Apppic,
  AppTopInstalledCountries,
  Appweather,
} from '../../sections/@dashboard/general/app';
import Appriding from '../../sections/@dashboard/general/app/Appriding';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function GeneralRiding() {
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg');



  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        {/* 데스크탑 */}
      {isDesktop && (
        
          <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
          <Appriding />
          </Grid>
         </Grid>)}

          {/* 모바일 */}
          {!isDesktop && (
          <Grid container spacing={1}>
           <Grid item xs={12} md={12}>
           <Appriding />
           </Grid>
                </Grid>)}
       
      </Container>
    </Page>
  );
}



