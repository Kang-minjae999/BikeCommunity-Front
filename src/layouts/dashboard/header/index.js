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
import { IconButtonAnimate } from '../../../components/animate';


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
  const isGarage = pathname.includes('garages')
  const isRiding = pathname.includes('riding')
  const isRider = pathname.includes('rider')
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
        {/* {!isDesktop && <MenuIcon color='action' onClick={onOpenSidebar} />} TODO */} 
        {isDesktop && 
          <Link component={RouterLink} to="/dashboard/app/home" underline="none" >         
          <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
            RIDERTOWN
          </Typography>
          </Link>}

       {!isDesktop && 
          <>      
            {isHome && <Link component={RouterLink} to="/dashboard/app" underline="none" >       
              <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
                RIDERTOWN
              </Typography>
            </Link>}

            {isGarage && <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
              정비
            </Typography>}

            {isRiding && <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
                라이딩
              </Typography>}
              
            {isRider && <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
              라이더
            </Typography>}

            {isMypage && <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
              마이페이지
            </Typography>}    

            {isCheckout && <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
              장바구니
            </Typography>}

            {isProfile && <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
              프로필
            </Typography>}

            {isMenu && <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
            메뉴
            </Typography>}

            {isNotice && <Typography color="text.primary" variant='h7' sx={{ mr: 2}}>
            공지사항
            </Typography>}
          </>}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={1}>
          <Notification /> 
          <IconButtonAnimate color='primary' onClick={() => navigate('/dashboard/checkout/new')} sx={{mr:1}}>
            <Iconify icon='bx:shopping-bag' sx={{width:28, height:28, color:'text.primary'}} />
          </IconButtonAnimate>
          {!isDesktop 
          ? <MyAvatar sx={{width:36, height:36}} onClick={Menu}/> 
          : <AccountPopover />}
        </Stack>
        </Toolbar>  
    </RootStyle>  
  );
}


