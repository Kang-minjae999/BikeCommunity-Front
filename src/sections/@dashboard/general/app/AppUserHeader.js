import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {  Typography, Paper } from '@mui/material';
import { AppUserMoto,  AppUserProfile, AppUserClub } from '.';
import UserAccount from '../../../../pages/dashboard/UserAccount';
import AppHeaderSpace from './AppHeaderSpace';
import Aecheckouthead from './Aecheckouthead';
import useResponsive from '../../../../hooks/useResponsive';

export default function AppUserHeader() {
  const isDesktop = useResponsive('up', 'lg')
  const [value, setValue] = useState('profile');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ACCOUNT_TABS = [
    {
      value: 'profile',
      component: <AppUserProfile />,
    },
    {
      value: 'checkout',
      component: <Aecheckouthead />,
    },
    {
      value: 'moto',
      component: <AppUserMoto />,
    },
    {
      value: 'club',
      component: <AppUserClub/>,
    },
    {
      value: 'setting',
      component: <UserAccount/>,
    },
  ];

  const valueStyle = {
    borderBottom:2, 
    borderBottomColor:'text.primary'
  }

  
  return (
    <>
    {isDesktop &&
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary'>프로필</Typography>}
        value="profile"
      />
      <BottomNavigationAction
        label={<Typography  variant='subtitle2' color='text.primary'>장바구니</Typography>}
        value="checkout"
      />
      <BottomNavigationAction
        label={<Typography  variant='subtitle2' color='text.primary'>바이크</Typography>}
        value="moto"
      />
      <BottomNavigationAction
        label={<Typography  variant='subtitle2' color='text.primary'>클럽</Typography>}
        value="club"
      />
      <BottomNavigationAction 
        label={<Typography  variant='subtitle2' color='text.primary'>설정</Typography>}
        value="setting" 
        />
    </BottomNavigation>}
    {!isDesktop &&
    <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex:50}} elevation={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        sx={{...(value === 'profile') && valueStyle}}
        label={<Typography variant='subtitle2' color='text.primary'>프로필</Typography>}
        value="profile"
      />
      <BottomNavigationAction
        sx={{...(value === 'checkout') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>장바구니</Typography>}
        value="checkout"
      />
      <BottomNavigationAction
        sx={{...(value === 'moto') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>바이크</Typography>}
        value="moto"
      />
      <BottomNavigationAction
        sx={{...(value === 'club') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>클럽</Typography>}
        value="club"
      />
      <BottomNavigationAction 
        sx={{...(value === 'setting') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>설정</Typography>}
        value="setting" 
        />
    </BottomNavigation>
    </Paper>}
    <AppHeaderSpace />
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value} >{button.component}</div>;
        })}
    </>
  );
}
