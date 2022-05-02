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
import { WEATHER_API } from '../../../../config';





// ----------------------------------------------------------------------

export default function Appweather() {
  const API = WEATHER_API

  const [lat, setlat] = useState('');
  const [lng, setlng] = useState('');
  const [weathericon, setweathericon] = useState('');
  const [weathername, setweathername] = useState('');
  const [weathericon2, setweathericon2] = useState('');
  const [weathername2, setweathername2] = useState('');
  const [weather, setweather] = useState('');
  const [weather2, setweather2] = useState('');
  const [istrue, setistrue] =useState(false);
  const [istrue2, setistrue2] =useState(false);

  useEffect(() => {
    if(window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({type:'onWeather'}))}
  }, []);

  const [data , setdata] = useState(undefined);

  const listner = (event) => {
  setdata(JSON.parse(event.data))
  }
  // android
  useEffect(() => {
    document.addEventListener('message', listner)
    return () => {document.removeEventListener('message', listner);}
  }, []);
  // ios
  useEffect(() => {
    window.addEventListener('message', listner)
    return () => {window.removeEventListener('message', listner);}
    }, []);

  useEffect(() => {
    if(data !== undefined) {
      setlat(data[0])
      setlng(data[1])
    }
  }, [data]);
  
  const componentDidMount = useCallback(() => {
    if(navigator.geolocation){
    setistrue(true)
    setistrue2(true)
     navigator.geolocation.getCurrentPosition((position) => {
      setlat(position.coords.latitude);
      setlng(position.coords.longitude);})}
    else if(data!==undefined){
      setistrue(true)
      setistrue2(true)
    }
  },[data])
 
  useEffect(() => {
    componentDidMount()
    if(lat !== '' && lng !== ''){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=Kr&appid=${API}`)
      .then((responseData) => {
        const Data = responseData.data;
        setweather({
          id: Data.weather[0].id,
          temperature: `${(Data.main.temp-273.15).toFixed(1)}℃`,
          main: Data.weather[0].main,
          description: Data.weather[0].description,
          loading: false,
          name: Data.name,
        });
      });
     }
     return ()=>{
      setistrue(false);
     }
 }, [istrue ,lat ,lng, componentDidMount, API]);


  
 useEffect(() => {
  componentDidMount()
  if(lat !== '' && lng !== ''){
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&lang=Kr&cnt=2&appid=${API}`)
    .then((responseData) => {
      const data = responseData.data.list[1]; 
      const datas = responseData.data; 
      setweather2({
        id: data.weather[0].id,
        temperature: `${(data.main.temp-273.15).toFixed(1)}℃`,
        main: data.weather[0].main,
        description: data.weather[0].description,
        loading: false,
        name: datas.city.name,
      });
    });
  }
   return ()=>{
    setistrue2(false);
   }
}, [istrue2,lat,lng, componentDidMount, API]);

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
