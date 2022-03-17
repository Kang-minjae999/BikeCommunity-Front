import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Link, Divider, Typography, Paper } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive'; 
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import Appmobileheader from '../../../sections/@dashboard/general/app/Appmobileheader';




// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),

  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
  const [valuetrue,setvaluetrue] = useState(false)

  const clicker = () => {
    setvaluetrue(true);
  }





// -------------------------------------------------------
   
  const link = useNavigate();

  useEffect(() => {
    if(valuetrue === true )
    {
    link(`/dashboard/all-e-commerce/checkout`)
    } 
    return () => {
      setvaluetrue(false)
        };
    }, [valuetrue]); 

  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout} >
      <Toolbar
        sx={{
          px: { lg: 5 },
          border:"1px",
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{mb: 0.5}} /> }
        {isDesktop && verticalLayout &&   <Searchbar />}

  {/*       {!isDesktop && (
          
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate> 
            )}  */}
          <Link component={RouterLink} to="/dashboard/app"underline="none" >         
            <Typography color="primary" variant='h4' sx={{ ml: 1 , mr: 2}}>
            RIDERTOWN
            </Typography>
            </Link>
            
            
        <Box sx={{ flexGrow: 1 }} />
        

        <Stack direction="row" alignItems="center" spacing={{ xs: 2, sm: 1.5 }}>
         <Searchbar />
          <LocalGroceryStoreIcon color='primary' onClick={clicker}/>
          <AccountPopover color='primary' onOpenSidebar={onOpenSidebar}/>
        </Stack>
        {!isDesktop && 
        <Paper sx={{ position: 'fixed', top: 50, left: 0, right: 0 }} elevation={1}>
        <Appmobileheader/>
          </Paper>}
      </Toolbar>    
    </RootStyle>  
  );
}


