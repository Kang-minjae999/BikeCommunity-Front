import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Link, Typography, Button } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MenuIcon from '@mui/icons-material/Menu';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive'; 
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import AccountPopover from './AccountPopover';




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
  const link = useNavigate();

  const [valuetrue,setvaluetrue] = useState(false)
  const [valuetrue2,setvaluetrue2] = useState(false)
  const [value, setValue] = useState('');

  useEffect(() => {
    if(valuetrue === true )
    {
    link(`/dashboard/${value}`)
    } 
    return () => {
      setvaluetrue(false)
        };
    }, [valuetrue]); 

  useEffect(() => {
    if(valuetrue2 === true )
    {
    link(`/dashboard/all-e-commerce/checkout`)
    } 
    return () => {
      setvaluetrue2(false)
        };
    }, [valuetrue2]); 

// -------------------------------------------------------

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
         {!isDesktop && <MenuIcon color='action' onClick={onOpenSidebar} />}
          <Link component={RouterLink} to="/dashboard/app"underline="none" >         
          <Typography color="text.primary" variant='h4' sx={{ ml: 1 , mr: 2}}>
            RIDERTOWN
          </Typography>
          </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 2, sm: 1.5 }}>
        <Link component={RouterLink} to="/dashboard/all-e-commerce/checkout"underline="none" sx={{mt:1}}>     
          <LocalGroceryStoreIcon color='action'/>
        </Link>
          <AccountPopover color='text.primary'/>
        </Stack>
        </Toolbar>  
        {!isDesktop &&
        <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={0} sx={{mx:1}}>
          <Button variant='text' onClick={()=> setValue('app')+ setvaluetrue(true)}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>홈</Typography>
          </Button>
          <Button variant='text' onClick={()=> setValue('market/all')+ setvaluetrue(true)}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>쇼핑</Typography>
          </Button>
          <Button variant='text' onClick={()=> setValue('marketu/all')+ setvaluetrue(true)}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>중고</Typography>
          </Button>
          <Button variant='text' onClick={()=> setValue('garages')+ setvaluetrue(true)}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>정비</Typography>
          </Button>
          <Button variant='text' onClick={()=> setValue('clubs')+ setvaluetrue(true)}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>클럽</Typography>
          </Button>
        </Stack>}
    </RootStyle>  
  );
}


