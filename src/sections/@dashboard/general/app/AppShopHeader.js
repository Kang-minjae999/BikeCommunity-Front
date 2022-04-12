import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {  Typography, Paper } from '@mui/material';
import { AppUserMoto, AppHomeMagazine, AppShopAllCate } from '.';
import AppHeaderSpace from './AppHeaderSpace';
import Generalmarket from '../../../../pages/dashboard/GeneralMarket';
import Generalmarketu from '../../../../pages/dashboard/GeneralMarketu';

export default function AppUserHeader() {
  const [value, setValue] = useState('all');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const ACCOUNT_TABS = [
    {
      value: 'all',
      component: <AppShopAllCate />,
    },
    {
      value: 'market',
      component: <Generalmarket />,
    },
    {
      value: 'brand',
      component: <AppHomeMagazine/>,
    },
    {
      value: 'newmoto',
      component: <AppUserMoto />,
    },
    {
      value: 'used',
      component: <Generalmarketu/>,
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
        sx={{...(value === 'all') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>모아보기</Typography>}
        value="all" 
        />
      <BottomNavigationAction
        sx={{...(value === 'market') && valueStyle}}
        label={<Typography variant='subtitle2' color='text.primary'>신품</Typography>}
        value="market"
      />
      <BottomNavigationAction
        sx={{...(value === 'brand') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>브랜드</Typography>}
        value="brand"
      />
      <BottomNavigationAction
        sx={{...(value === 'newmoto') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>신차</Typography>}
        value="newmoto"
      />
      <BottomNavigationAction
        sx={{...(value === 'used') && valueStyle}}
        label={<Typography  variant='subtitle2' color='text.primary'>중고</Typography>}
        value="used"
      />
    </BottomNavigation>
    </Paper>
    <AppHeaderSpace />
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
    </>
  );
}
