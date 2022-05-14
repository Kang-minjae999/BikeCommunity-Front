import PropTypes from 'prop-types';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack, Grid } from '@mui/material';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import Appweather from './Appweather';
import Iconify from '../../../../components/Iconify';
import AppRidingHomeCalendar from './AppRidingHomeCalendar';
// ----------------------------------------------------------------------
AppRidingHome.propTypes = {
  icon: PropTypes.string,
  userPo: PropTypes.object,
  weather1: PropTypes.object,
  weather2: PropTypes.object,
};

export default function AppRidingHome({ icon, userPo, weather1, weather2 }) {
  const navigate = useNavigate()
  const [open, setopen] = useState(icon)

  useEffect(() => {
    setopen(icon)
  }, [icon])
  
 
  return (
    <>
      <Container>   
      <Stack direction='row' alignItems='center' justifyContent='space-between'>   
        <Button variant='outlined' size='large' onClick={() =>  navigate(`/dashboard/riding/home/calendar`)} color='inherit' sx={{mb:2}}>
          <Iconify icon='ant-design:home-outlined' sx={open === 'calendar' ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}}/></Button>      
        <Button variant='outlined' size='large' onClick={() => navigate(`/dashboard/riding/home/map`)} color='inherit' sx={{mb:2}}>
          <Iconify icon='bi:map' sx={open === 'map' ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}}/></Button> 
        <Button variant='outlined' size='large' onClick={() => navigate(`/dashboard/riding/home/myroute`)} color='inherit' sx={{mb:2}}>
          <Iconify icon='clarity:star-line'  sx={open === 'myroute' ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'inherit'}}/></Button>
      </Stack>
        {open === 'calendar' && 
        <Grid container>
        <Grid item xs={12} lg={8}>
          <AppRidingHomeCalendar />
         </Grid>        
        </Grid>}  
        {userPo && <GeneralMap tab={open} userPo={userPo} open={open} setopen={setopen}/>}
        {open === 'map' && <>{weather1 && weather2 && <Appweather weather={weather1} weather2={weather2} />}</>}
      </Container>
    </>
  );
}
