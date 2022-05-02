import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Link, Typography } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive'; 
// utils
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import AccountPopover from './AccountPopover';
import Notification from './Notification';


// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  backgroundColor: theme?.palette.background.default,
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
  const {pathname} = useLocation()

  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  const isHome = pathname.includes('app')
  const isShop = pathname.includes('shop')
  const isRiding = pathname.includes('riding')
  const isRider = pathname.includes('rider')
  const isMypage = pathname.includes('mypage')
  const isCheckout = pathname.includes('checkout')
  const isProfile = pathname.includes('profile')

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}  >
      <Toolbar
        sx={{
          px: { lg: 5 }, 
          border:"1px",
        }}
      >
        {/* {!isDesktop && <MenuIcon color='action' onClick={onOpenSidebar} />} */}
        {isDesktop && 
          <Link component={RouterLink} to="/dashboard/app" underline="none" >         
          <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
            RIDERTOWN
          </Typography>
          </Link>}

       {!isDesktop && 
          <>      
            {isHome && <Link component={RouterLink} to="/dashboard/app" underline="none" >       
              <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
                RIDERTOWN
              </Typography>
            </Link>}

            {isShop && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
                SHOP
              </Typography>}

            {isRiding && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
                RIDING
              </Typography>}
              
            {isRider && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
                RIDER
              </Typography>}
            
            {isMypage && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
              MYPAGE
            </Typography>}    

            {isCheckout && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
              CART
            </Typography>}

            {isProfile && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
              PROFILE
            </Typography>}
          </>}

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={{ xs: 2, sm: 1.5 }}>
          <Notification />
        <Link component={RouterLink} to="/dashboard/checkout" underline="none" sx={{mt:1}}>     
          <LocalGroceryStoreIcon color='action' />
        </Link>
          <AccountPopover color='text.primary' />
        </Stack>
        </Toolbar>  
    </RootStyle>  
  );
}


