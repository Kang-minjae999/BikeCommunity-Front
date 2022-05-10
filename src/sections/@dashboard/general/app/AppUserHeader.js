import * as React from 'react';
import {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {  Typography, Paper, Divider } from '@mui/material';
import { AppUserMoto,  AppUserProfile, AppUserClub } from '.';
import UserAccount from '../../../../pages/dashboard/UserAccount';
import AppHeaderSpace from './AppHeaderSpace';
import AppUserCheckout from './AppUserCheckout';
import useResponsive from '../../../../hooks/useResponsive';

export default function AppUserHeader() {
  const isDesktop = useResponsive('up', 'lg')
  const {value} = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    if(!value){
      navigate(`/dashboard/mypage/setting`);
    }
  })
  
  const handleChange = (event, newValue) => {
    navigate(`/dashboard/mypage/${newValue}`);
  };


  const ACCOUNT_TABS = [
    {
      value: 'prof',
      component: <AppUserProfile />,
    },
    {
      value: 'check',
      component: <AppUserCheckout />,
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
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'prof') && valueStyle}}>프로필</Typography>}
        value="prof"
      />
      <BottomNavigationAction
        label={<Typography  variant='body2' color='text.primary' sx={{...(value === 'check') && valueStyle}}>장바구니</Typography>}
        value="check"
      />
      <BottomNavigationAction
        label={<Typography  variant='body2' color='text.primary' sx={{...(value === 'moto') && valueStyle}}>바이크</Typography>}
        value="moto"
      />
      <BottomNavigationAction
        label={<Typography  variant='body2' color='text.primary' sx={{...(value === 'club') && valueStyle}}>클럽</Typography>}
        value="club"
      />
      <BottomNavigationAction 
        label={<Typography  variant='body2' color='text.primary' sx={{...(value === 'setting') && valueStyle}}>설정</Typography>}
        value="setting" 
      />
    </BottomNavigation>
    <Divider />
    </>}
    {!isDesktop &&
    <>
    <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex:50}} elevation={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
        sx={{...(value === 'profile') && valueStyle}}
        label={<Typography variant='subtitle3' color={value === 'prof' ? 'text.primary' : 'disabled'}>프로필</Typography>}
        value="prof"
      />
      <BottomNavigationAction
        sx={{...(value === 'checkout') && valueStyle}}
        label={<Typography  variant='subtitle3' color={value === 'check' ? 'text.primary' : 'disabled'}>장바구니</Typography>}
        value="check"
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
      <BottomNavigationAction
        sx={{...(value === 'setting') && valueStyle}}
        label={<Typography variant='subtitle3' color={value === 'setting' ? 'text.primary' : 'disabled'}>설정</Typography>}
        value="setting"
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
