import * as React from 'react';
import {useState, useEffect} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {  Typography, Paper, Divider } from '@mui/material';
import { AppHomeMain ,AppHomeBest, AppHomeBrand, AppHomeMagazine, AppHomeSale } from '.';
import AppHeaderSpace from './AppHeaderSpace';
import useResponsive from '../../../../hooks/useResponsive';


export default function AppHomeHeader() {
  const isDesktop = useResponsive('up', 'lg')
  const [value, setValue] = useState('home');
  const [valuepc, setValuepc] = useState('homepc');

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
  

  const APP_TABS = [
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

  const PC_TABS = [
    {
      value: 'homepc',
      component: <AppHomeMain />,
    },
    {
      value: 'brand',
      component: <AppHomeBest />,
    },
    {
      value: 'replica',
      component: <AppHomeBrand />,
    },
    {
      value: 'naked',
      component: <AppHomeMagazine/>,
    },
    {
      value: 'sale',
      component: <AppHomeSale/>,
    },
    {
      value: 'hal',
      component: <AppHomeMagazine/>,
    },
    {
      value: 'classic',
      component: <AppHomeSale/>,
    },
    {
      value: 'scoo',
      component: <AppHomeMagazine/>,
    },
    {
      value: 'mota',
      component: <AppHomeSale/>,
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
       <BottomNavigation showLabels sx={{ width: '100%'}} value={valuepc} onChange={handleChange}>
            <BottomNavigationAction
            label={<Typography variant='body2' color='text.primary' sx={{...(valuepc === 'homepc') && valueStyle}}>메인</Typography>}
            value="homepc"
          />
          <BottomNavigationAction
            label={<Typography variant='body2' color='text.primary' sx={{...(valuepc === 'brand') && valueStyle}}>BRAND</Typography>}
            value="brand"
          />
          <BottomNavigationAction
            label={<Typography variant='body2' color='text.primary' sx={{...(valuepc === 'replica') && valueStyle}}>레플리카</Typography>}
            value="replica"
          />
          <BottomNavigationAction
            label={<Typography variant='body2' color='text.primary' sx={{...(valuepc === 'naked') && valueStyle}}>네이키드</Typography>}
            value="naked"
          />
          <BottomNavigationAction
            label={<Typography variant='body2' color='text.primary' sx={{...(valuepc === 'hal') && valueStyle}}>할리/크루저</Typography>}
            value="hal"
          />
          <BottomNavigationAction 
            label={<Typography variant='body2' color='text.primary' sx={{...(valuepc === 'classic') && valueStyle}}>클래식</Typography>}
            value="classic" 
            />
            <BottomNavigationAction 
            label={<Typography variant='body2' color='text.primary' sx={{...(valuepc === 'scoo') && valueStyle}}>스쿠터</Typography>}
            value="scoo" 
            />
            <BottomNavigationAction 
            label={<Typography variant='body2' color='text.primary' sx={{...(valuepc === 'mota') && valueStyle}}>모타드</Typography>}
            value="mota" 
            />
        </BottomNavigation>
      <Divider />
        </>}
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
        label={<Typography  variant='subtitle2' color='text.primary'>장르</Typography>}
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
    {isDesktop ? <>
      {PC_TABS.map((button) => {
          const isMatched = button.value === valuepc;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
     </> : <>
      {APP_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
     </>
     }
     </>
  );
}
