import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Container, Grid, Stack , Typography } from '@mui/material';
import { sentenceCase } from 'change-case';
import { ChatSidebar , ChatWindow } from '../../sections/@dashboard/chat';
import  {PATH_DASHBOARD}  from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { useDispatch, useSelector } from '../../redux/store';
import { getProduct } from '../../redux/slices/product';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  Appkakaochat,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/club/app';
import Chat from './Chat';
import Clubcalender from './Clubcalender';

// ----------------------------------------------------------------------
export default function Clubroomhome() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();
  
  const { name = '' } = useParams();
  
  
  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);
  
// 공지사항 가입멤버 라이딩알람 , 카카오 채팅방 등 
  return (
  <>
          <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
          <AppNewInvoice />
          <br/>
          <AppNewInvoice />
          </Grid>          
          <Grid item xs={12} md={4}>
            {product && (
          <Appkakaochat name={name} product={product}/>)}
          <AppTopAuthors /><br/>
          </Grid>  
          </Grid>
  </>
  );
}
