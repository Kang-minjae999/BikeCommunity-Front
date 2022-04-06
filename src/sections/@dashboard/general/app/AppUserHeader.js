import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {  Typography, Stack, Paper, Box } from '@mui/material';
import { AppUserMoto, AppHomeMagazine, AppHomeSale, AppUserProfile } from '.';
import AEcommerceCheckout from '../../../../pages/dashboard/AEcommerceCheckout';
import UserAccount from '../../../../pages/dashboard/UserAccount';
import AppHeaderSpace from './AppHeaderSpace';
import Aecheckouthead from './Aecheckouthead';

export default function AppUserHeader() {
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
      value: 'garagerecord',
      component: <AppHomeMagazine/>,
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
        label={<Typography  variant='subtitle2' color='text.primary'>서비스</Typography>}
        value="moto"
      />
      <BottomNavigationAction
        sx={{...(value === 'garagerecord') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>바이크</Typography>}
        value="garagerecord"
      />
      <BottomNavigationAction 
        sx={{...(value === 'setting') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>설정</Typography>}
        value="setting" 
        />
    </BottomNavigation>
    </Paper>
    <AppHeaderSpace />
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value} >{button.component}</div>;
        })}
    </>
  );
}
