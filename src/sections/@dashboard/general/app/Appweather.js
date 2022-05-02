import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react'
import axios from 'axios';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
// -----------------------------------------
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BoltIcon from '@mui/icons-material/Bolt';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterIcon from '@mui/icons-material/Water';
import DangerousIcon from '@mui/icons-material/Dangerous';
import AirIcon from '@mui/icons-material/Air';
// ----------------------------------------
import { Appweathercontent, Appweathercontent2 } from '.';





// ----------------------------------------------------------------------
Appweather.propTypes = {
  weather: PropTypes.object,
  weather2: PropTypes.object,
};


export default function Appweather({weather, weather2}) {
  const [weathericon, setweathericon] = useState('');
  const [weathername, setweathername] = useState('');
  const [weathericon2, setweathericon2] = useState('');
  const [weathername2, setweathername2] = useState('');


useEffect(() => {
  if ((weather.id >= 200) && (weather.id <= 250)){
    setweathericon(<BoltIcon/>) 
    setweathername('천둥번개')
  }
  if ((weather.id >= 300) && (weather.id <= 350)){
    setweathericon(<UmbrellaIcon/>) 
    setweathername('이슬비')
  }
  if ((weather.id >= 500) && (weather.id <= 550)){
    setweathericon(<UmbrellaIcon/>) 
    setweathername('비')
  }
  if ((weather.id >= 600) && (weather.id <= 650)){
    setweathericon(<AcUnitIcon/>) 
    setweathername('눈')
  }
  if ((weather.id >= 700) && (weather.id <= 750)){
    setweathericon(<WaterIcon/>) 
    setweathername('안개')
  }
  if (weather.id === 800){
    setweathericon(<WbSunnyIcon/>) 
    setweathername('맑음')
  }
  if ((weather.id >= 801) && (weather.id <= 850)){
    setweathericon(<WaterIcon/>) 
    setweathername('구름')
  }
  if ((weather.id >= 900) && (weather.id <= 910)){
    setweathericon(<DangerousIcon/>) 
    setweathername('위험')
  }
  if ((weather.id >= 951) && (weather.id <= 955)){
    setweathericon(<AirIcon/>) 
    setweathername('바람')
  }
  if ((weather.id >= 956) && (weather.id <= 959)){
    setweathericon(<AirIcon/>) 
    setweathername('강풍')
  }
  if ((weather.id >= 957) && (weather.id <= 1000)){
    setweathericon(<DangerousIcon/>) 
    setweathername('위험')
  }
}, [weather]);

useEffect(() => {
  if ((weather2.id >= 200) && (weather2.id <= 250)){
    setweathericon2(<BoltIcon/>) 
    setweathername2('천둥번개')
  }
  if ((weather2.id >= 300) && (weather2.id <= 350)){
    setweathericon2(<UmbrellaIcon/>) 
    setweathername2('이슬비')
  }
  if ((weather2.id >= 500) && (weather2.id <= 550)){
    setweathericon2(<UmbrellaIcon/>) 
    setweathername2('비')
  }
  if ((weather2.id >= 600) && (weather2.id <= 650)){
    setweathericon2(<AcUnitIcon/>) 
    setweathername2('눈')
  }
  if ((weather2.id >= 700) && (weather2.id <= 750)){
    setweathericon2(<WaterIcon/>) 
    setweathername2('안개')
  }
  if (weather2.id === 800){
    setweathericon2(<WbSunnyIcon/>) 
    setweathername2('맑음')
  }
  if ((weather2.id >= 801) && (weather2.id <= 850)){
    setweathericon2(<WaterIcon/>) 
    setweathername2('구름')
  }
  if ((weather2.id >= 900) && (weather2.id <= 910)){
    setweathericon2(<DangerousIcon/>) 
    setweathername2('위험')
  }
  if ((weather2.id >= 951) && (weather2.id <= 955)){
    setweathericon2(<AirIcon/>) 
    setweathername2('바람')
  }
  if ((weather2.id >= 956) && (weather2.id <= 959)){
    setweathericon2(<AirIcon/>) 
    setweathername2('강풍')
  }
  if ((weather2.id >= 957) && (weather2.id <= 1000)){
    setweathericon2(<DangerousIcon/>) 
    setweathername2('위험')
  }
}, [weather2]);



const onClickRiding = () => {
  if(!window.ReactNativeWebView) {
    alert('어플리케이션에서만 이용 가능합니다.')
  }
  else{
    window.ReactNativeWebView.postMessage(JSON.stringify({type:'onRide'}))}
}


  return (
<>
<Grid container >
{window.ReactNativeWebView && <Button onClick={onClickRiding} variant='outlined' color='inherit' sx={{mt:1, mb:2, width:'100%', color:'text.primary'}}>목적지 없이 라이딩 시작하기</Button>}
  {weather && 
  <Card sx={{width:'100%' , border:1, borderColor:'darkgray'}}>
  <Stack direction='row'>
  <Appweathercontent weather={weather} weathername={weathername} weathericon={weathericon}/>
  <Appweathercontent2 weather={weather2} weathername={weathername2} weathericon={weathericon2}/>
  </Stack>
  </Card>}
  {!weather && 
  <>
  <Grid item xs={12} lg={12}>
  <Box sx={{height:150}}>
    <Stack direction='row' alignItems='center' justifyContent='center'>
      <Typography variant='subtitle2'>
          날씨를 불러오고 있어요...
      </Typography>
    </Stack>
  </Box>
  </Grid>
  </>}
</Grid>
</> 
);
}
