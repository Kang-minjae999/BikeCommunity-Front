import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../config';
//
import DashboardHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';
import LabelBottomNavigation from './header/LabelBottomNavigation';

// ----------------------------------------------------------------------

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT ,
  paddingBottom: HEADER.MOBILE_HEIGHT ,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { collapseClick, isCollapse } = useCollapseDrawer();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader isCollapse={isCollapse}/>

      <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle collapseClick={collapseClick}>
        <Outlet />      
      </MainStyle>
      {!isDesktop &&
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={1}>
      <LabelBottomNavigation/>
      </Paper>}
    </Box>
  );
}
