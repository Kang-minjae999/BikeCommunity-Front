import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Link, Typography } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
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

DashboardHeaderForProfile.propTypes = {
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeaderForProfile({ isCollapse = false, verticalLayout = false }) {
  const {pathname} = useLocation()
  const {nickname = ''} = useParams()

  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  const isGarage = pathname.includes('garage/profile')

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
            <Link component={RouterLink} to="/dashboard/app" underline="none" >       
              <Typography color="text.primary" variant='h3' sx={{ mr: 2}}>
                {nickname}
              </Typography>
            </Link>
          </>}

        <Box sx={{ flexGrow: 1 }} />
        {!isDesktop &&  <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={{ xs: 2, sm: 1.5 }}>
        {isGarage && 
          <> 
          <CallOutlinedIcon color='action'/>
          <ForumOutlinedIcon color='action'/>
          <ContactSupportOutlinedIcon color='action'/>
          </>}
          </Stack>}
         {isDesktop && 
         <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={{ xs: 2, sm: 1.5 }}>
          <Notification />
        <Link component={RouterLink} to="/dashboard/checkout" underline="none" sx={{mt:1}}>     
          <LocalGroceryStoreIcon color='action' />
        </Link>
          <AccountPopover color='text.primary' />
        </Stack>}
        </Toolbar>  
    </RootStyle>  
  );
}


