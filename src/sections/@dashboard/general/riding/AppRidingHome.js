import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Stack, Grid } from '@mui/material';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import Appweather from './Appweather';
import Iconify from '../../../../components/Iconify';
import AppRidingHomeCalendar from './AppRidingHomeCalendar';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getPosition } from '../../../../redux/slices/map';
// ----------------------------------------------------------------------


export default function AppRidingHome() {
  const navigate = useNavigate()

  const {icon} = useParams();

  const dispatch = useDispatch();
  const { weatherOne, weatherTwo } = useSelector((state) => state.map);

  const [userPo, setuserPo] = useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
      const userPo = {lat:position.coords.latitude, lng: position.coords.longitude}
      setuserPo(userPo)
    }); 
    return () =>{setuserPo()};
  }, [])

  useEffect(() => {
    dispatch(getPosition());
  }, [dispatch]);

  useEffect(() => {
    if(!icon){
      navigate(`/dashboard/riding/home/calendar`);
    }
  })
  
  const [open, setopen] = useState(icon)

  useEffect(() => {
    setopen(icon)
  }, [icon])
  
 
  return (
    <>
      <Container sx={{mt:2}}>   
      <Stack direction='row' alignItems='center' justifyContent='space-between'>   
        <Button variant='outlined' size='large' onClick={() =>  navigate(`/dashboard/riding/home/calendar`)} color='inherit' sx={{mb:2}}>
          <Iconify icon='ant-design:home-outlined' sx={open === 'calendar' ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'text.disabled'}}/></Button>      
        <Button variant='outlined' size='large' onClick={() => navigate(`/dashboard/riding/home/map`)} color='inherit' sx={{mb:2}}>
          <Iconify icon='bi:map' sx={open === 'map' ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'text.disabled'}}/></Button> 
        <Button variant='outlined' size='large' onClick={() => navigate(`/dashboard/riding/home/myroute`)} color='inherit' sx={{mb:2}}>
          <Iconify icon='clarity:star-line'  sx={open === 'myroute' ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'text.disabled'}}/></Button>
      </Stack>
        {open === 'calendar' && 
        <Grid container>
        <Grid item xs={12} lg={8}>
          <AppRidingHomeCalendar />
         </Grid>        
        </Grid>}  
        {userPo && <GeneralMap tab={open} userPo={userPo} open={open} setopen={setopen}/>}
        {open === 'map' && <>{weatherOne && weatherTwo && <Appweather weather={weatherOne} weather2={weatherTwo} />}</>}
      </Container>
    </>
  );
}
