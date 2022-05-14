import * as React from 'react';
import {useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography, Paper, Divider } from '@mui/material';
import { AppHomeMain ,AppHomeBest, AppHomeBrand, AppHomeMagazine } from '.';
import AppHeaderSpace from './AppHeaderSpace';
import useResponsive from '../../../../hooks/useResponsive';
import GeneralMarketu from '../../../../pages/dashboard/GeneralMarketu';


export default function AppHomeHeader() {
  const isDesktop = useResponsive('up', 'lg');
  const navigate = useNavigate();
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
      value: 'brand',
      component: <AppHomeBest />,
    },
    {
      value: 'genre',
      component: <AppHomeBrand />,
    },
    {
      value: 'category',
      component: <AppHomeMagazine/>,
    },
    {
      value: 'used',
      component: <GeneralMarketu />,
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
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'genre') && valueStyle}}>장르</Typography>}
        value="genre"
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'category') && valueStyle}}>카테고리</Typography>}
        value="category"
      />
      <BottomNavigationAction 
        label={<Typography variant='body2' color='text.primary' sx={{...(value === 'used') && valueStyle}}>중고</Typography>}
        value="used" 
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
        sx={{...(value === 'genre') && valueStyle}}
        label={<Typography  variant='subtitle3'  color={value === 'genre' ? 'text.primary' : 'disabled'}>장르</Typography>}
        value="genre"
      />
      <BottomNavigationAction
        sx={{...(value === 'category') && valueStyle}}
        label={<Typography  variant='subtitle3'  color={value === 'category' ? 'text.primary' : 'disabled'}>카테고리</Typography>}
        value="category"
      />
      <BottomNavigationAction 
        sx={{...(value === 'used') && valueStyle}}
        label={<Typography  variant='subtitle3' color={value === 'used' ? 'text.primary' : 'disabled'}>중고</Typography>}
        value="used" 
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
