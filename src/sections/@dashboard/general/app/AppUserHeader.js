import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {  Typography, Paper, Divider } from '@mui/material';
import { AppUserMoto,  AppUserProfile, AppUserClub } from '.';
import UserAccount from '../../../../pages/dashboard/UserAccount';
import AppHeaderSpace from './AppHeaderSpace';
import Aecheckouthead from './Aecheckouthead';
import useResponsive from '../../../../hooks/useResponsive';

export default function AppUserHeader() {
  const isDesktop = useResponsive('up', 'lg')
  const [value, setValue] = useState('setting');

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
    borderBottom:(isDesktop ? 3 : 2), 
    borderBottomColor:'text.primary',
    fontWeight:'bold'
  }

  
  return (
    <>
    {isDesktop &&
    <>
    <Divider />
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction 
        label={<Typography  variant='body2' color='text.primary' sx={{...(value === 'setting') && valueStyle}}>설정</Typography>}
        value="setting" 
        />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'profile') && valueStyle}}>프로필</Typography>}
        value="profile"
      />
      <BottomNavigationAction
        label={<Typography  variant='body2' color='text.primary' sx={{...(value === 'checkout') && valueStyle}}>장바구니</Typography>}
        value="checkout"
      />
      <BottomNavigationAction
        label={<Typography  variant='body2' color='text.primary' sx={{...(value === 'moto') && valueStyle}}>바이크</Typography>}
        value="moto"
      />
      <BottomNavigationAction
        label={<Typography  variant='body2' color='text.primary' sx={{...(value === 'club') && valueStyle}}>클럽</Typography>}
        value="club"
      />
    </BottomNavigation>
    <Divider />
    </>}
    {!isDesktop &&
    <>
    <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex:50}} elevation={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
        sx={{...(value === 'setting') && valueStyle}}
        label={<Typography variant='subtitle3' color={value === 'setting' ? 'text.primary' : 'disabled'}>설정</Typography>}
        value="setting"
      />
      <BottomNavigationAction
        sx={{...(value === 'profile') && valueStyle}}
        label={<Typography variant='subtitle3' color={value === 'profile' ? 'text.primary' : 'disabled'}>프로필</Typography>}
        value="profile"
      />
      <BottomNavigationAction
        sx={{...(value === 'checkout') && valueStyle}}
        label={<Typography  variant='subtitle3' color={value === 'checkout' ? 'text.primary' : 'disabled'}>장바구니</Typography>}
        value="checkout"
      />
      <BottomNavigationAction
        sx={{...(value === 'moto') && valueStyle}}
        label={<Typography  variant='subtitle3'color={value === 'moto' ? 'text.primary' : 'disabled'}>바이크</Typography>}
        value="moto"
      />
      <BottomNavigationAction
        sx={{...(value === 'club') && valueStyle}}
        label={<Typography  variant='subtitle3' color={value === 'club' ? 'text.primary' : 'disabled'}>클럽</Typography>}
        value="club"
      />
    </BottomNavigation>
    </Paper>
    <AppHeaderSpace />
    </>}
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value} >{button.component}</div>;
        })}
    </>
  );
}
