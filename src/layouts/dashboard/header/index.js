import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Link, Typography } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive'; 
// utils
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Notification from './Notification';
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';
import AccountPopover from './AccountPopover';


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
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ isCollapse = false, verticalLayout = false }) {
  const {pathname} = useLocation()
  const navigate = useNavigate()

  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  const isHome = pathname.includes('app')
  const isShop = pathname.includes('shop')
  const isRiding = pathname.includes('riding')
  const isRider = pathname.includes('rider')
  const isMoto = pathname.includes('motocycle')
  const isMypage = pathname.includes('mypage')
  const isCheckout = pathname.includes('checkout')
  const isProfile = pathname.includes('profile')
  const isMenu = pathname.includes('menu')
  const isNotice = pathname.includes('notice')

  const Menu = () => {
    if(!isMenu){
      navigate('/dashboard/menu')
    }
    if(isMenu){
      navigate(-1)
    }
  }


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

            {isMoto && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
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

            {isMenu && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
            RIDERTOWN
            </Typography>}

            {isNotice && <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
            RIDERTOWN
            </Typography>}
          </>}

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={{ xs: 2, sm: 3 }}>
          <Notification />  
          <Iconify icon='bx:shopping-bag' sx={{width:28, height:28, color:'text.primary'}} onClick={() => navigate('/dashboard/checkout')}/>
          {!isDesktop 
          ? <MyAvatar sx={{width:36, height:36}} onClick={Menu}/> 
          : <AccountPopover />}
        </Stack>
        </Toolbar>  
    </RootStyle>  
  );
}


