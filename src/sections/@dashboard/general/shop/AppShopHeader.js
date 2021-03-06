import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography, Paper } from '@mui/material';
import { AppShopAllCate } from '.';
import AppHeaderSpace from '../app/AppHeaderSpace';
import Generalmarket from '../../../../pages/dashboard/GeneralMarket';
import Generalmarketu from '../../../../pages/dashboard/GeneralMarketu';
import { AppHomeMagazine } from '../app';
import { AppUserMoto } from '../user';

export default function AppUserHeader() {
  const {value} = useParams()
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    if(newValue === 'all'){
      navigate(`/dashboard/shop/${newValue}/all/0`);
    }
    if(newValue === 'market'){
      navigate(`/dashboard/shop/${newValue}/all/0`);
    }
    if(newValue === 'brand'){
      navigate(`/dashboard/shop/${newValue}/all/0`);
    }
    if(newValue === 'newmoto'){
      navigate(`/dashboard/shop/${newValue}/all/0`);
    }
    if(newValue === 'used'){
      navigate(`/dashboard/shop/${newValue}/biketrade/0`);
    }
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
      component: <AppHomeMagazine />,
    },
    {
      value: 'newmoto',
      component: <AppUserMoto />,
    },
    {
      value: 'used',
      component: <Generalmarketu />,
    },
  ];

  const valueStyle = {
    borderBottom: 2,
    borderBottomColor: 'text.primary',
  };

  return (
    <>
      <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex: 50 }} elevation={1}>
        <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            sx={{ ...(value === 'all' && valueStyle) }}
            label={
              <Typography variant="subtitle3" color={value === 'all' ? 'text.primary' : 'disabled'}>
                ??????
              </Typography>
            }
            value="all"
          />
          <BottomNavigationAction
            sx={{ ...(value === 'market' && valueStyle) }}
            label={
              <Typography variant="subtitle3" color={value === 'market' ? 'text.primary' : 'disabled'}>
                ?????????
              </Typography>
            }
            value="market"
          />
          <BottomNavigationAction
            sx={{ ...(value === 'brand' && valueStyle) }}
            label={
              <Typography variant="subtitle3" color={value === 'brand' ? 'text.primary' : 'disabled'}>
                ??????
              </Typography>
            }
            value="brand"
          />
          <BottomNavigationAction
            sx={{ ...(value === 'newmoto' && valueStyle) }}
            label={
              <Typography variant="subtitle3" color={value === 'newmoto' ? 'text.primary' : 'disabled'}>
                ????????????
              </Typography>
            }
            value="newmoto"
          />
          <BottomNavigationAction
            sx={{ ...(value === 'used' && valueStyle) }}
            label={
              <Typography variant="subtitle3" color={value === 'used' ? 'text.primary' : 'disabled'}>
                ??????
              </Typography>
            }
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
