import * as React from 'react';
import {useState, useEffect} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {  Typography, Stack, Paper, Box } from '@mui/material';
import { AppHomeMain ,AppHomeBest, AppHomeBrand, AppHomeMagazine, AppHomeSale } from '.';
import AppHeaderSpace from './AppHeaderSpace';
import useResponsive from '../../../../hooks/useResponsive';


export default function AppHomeHeader() {
  const isDesktop = useResponsive('up', 'lg')
  const [value, setValue] = useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(sessionStorage.getItem('homeheader')){
      setValue(sessionStorage.getItem('homeheader'))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('homeheader', value)
  }, [value])
  

  const ACCOUNT_TABS = [
    {
      value: 'home',
      component: <AppHomeMain />,
    },
    {
      value: 'best',
      component: <AppHomeBest />,
    },
    {
      value: 'brand',
      component: <AppHomeBrand />,
    },
    {
      value: 'post',
      component: <AppHomeMagazine/>,
    },
    {
      value: 'sale',
      component: <AppHomeSale/>,
    },
  ];

  const valueStyle = {
    borderBottom:2, 
    borderBottomColor:'text.primary'
  }
  
  return (
    <>
    {!isDesktop &&
      <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex:50}} elevation={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        sx={{...(value === 'home') && valueStyle}}
        label={<Typography variant='subtitle2' color='text.primary'>메인</Typography>}
        value="home"
      />
      <BottomNavigationAction
        sx={{...(value === 'best') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>BEST</Typography>}
        value="best"
      />
      <BottomNavigationAction
        sx={{...(value === 'brand') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>브랜드</Typography>}
        value="brand"
      />
      <BottomNavigationAction
        sx={{...(value === 'post') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>매거진</Typography>}
        value="post"
      />
      <BottomNavigationAction 
        sx={{...(value === 'sale') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>세일</Typography>}
        value="sale" 
        />
    </BottomNavigation>
    </Paper>}
    <AppHeaderSpace />
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
     </>
  );
}
