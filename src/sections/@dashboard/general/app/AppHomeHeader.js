import * as React from 'react';
import {useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {  Typography, Paper, Divider } from '@mui/material';
import { AppHomeMain ,AppHomeBest, AppHomeBrand, AppHomeMagazine, AppHomeSale } from '.';
import AppHeaderSpace from './AppHeaderSpace';
import useResponsive from '../../../../hooks/useResponsive';


export default function AppHomeHeader() {
  const isDesktop = useResponsive('up', 'lg')
  const navigate = useNavigate()
  const {value} = useParams();

  useEffect(() => {
    if(!value){
      navigate(`/dashboard/app/home`);
    }
  })

  const handleChange = (event, newValue) => {
    navigate(`/dashboard/app/${newValue}`);
  };

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
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' , my:2}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'home') && valueStyle}}>메인</Typography>}
        value="home"
      />
      <BottomNavigationAction
        label={<Typography variant='body2' fontStyle='italic' color='text.primary' sx={{...(value === 'brand') && valueStyle}}>BRAND</Typography>}
        value="brand"
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'best') && valueStyle}}>장르</Typography>}
        value="best"
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'post') && valueStyle}}>카테고리</Typography>}
        value="post"
      />
      <BottomNavigationAction 
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'sale') && valueStyle}}>SALE</Typography>}
        value="sale" 
        />
    </BottomNavigation>
      <Divider />
        </>}
    {!isDesktop &&
      <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex:50}} elevation={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        sx={{...(value === 'home') && valueStyle}}
        label={<Typography variant='subtitle3'  color={value === 'home' ? 'text.primary' : 'disabled'}>메인</Typography>}
        value="home"
      />
      <BottomNavigationAction
        sx={{...(value === 'brand') && valueStyle}}
        label={<Typography  variant='subtitle3' fontStyle='italic' color={value === 'brand' ? 'text.primary' : 'disabled'}>BRAND</Typography>}
        value="brand"
      />
      <BottomNavigationAction
        sx={{...(value === 'best') && valueStyle}}
        label={<Typography  variant='subtitle3'  color={value === 'best' ? 'text.primary' : 'disabled'}>장르</Typography>}
        value="best"
      />
      <BottomNavigationAction
        sx={{...(value === 'post') && valueStyle}}
        label={<Typography  variant='subtitle3'  color={value === 'post' ? 'text.primary' : 'disabled'}>카테고리</Typography>}
        value="post"
      />
      <BottomNavigationAction 
        sx={{...(value === 'sale') && valueStyle}}
        label={<Typography  variant='subtitle3' color={value === 'sale' ? 'text.primary' : 'disabled'}>SALE</Typography>}
        value="sale" 
        />
    </BottomNavigation>
    </Paper>}
    <AppHeaderSpace />
      {APP_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
     </>
  );
}
