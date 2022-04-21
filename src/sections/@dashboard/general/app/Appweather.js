import react, {useEffect, useState} from 'react'
import axios from 'axios';
import { Alert, Box, Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
// -----------------------------------------
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AlarmIcon from '@mui/icons-material/Alarm';
import BoltIcon from '@mui/icons-material/Bolt';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterIcon from '@mui/icons-material/Water';
import DangerousIcon from '@mui/icons-material/Dangerous';
import AirIcon from '@mui/icons-material/Air';
// ----------------------------------------
import { Appweathercontent, Appweathercontent2 } from '.';
import useResponsive from '../../../../hooks/useResponsive';





// ----------------------------------------------------------------------

export default function Appweather() {
  const API = 'ac90d9bee65995d552b23505a49fb30a'

  const isDesktop = useResponsive('up','lg')

  const [lat, setlat] = useState('');
  const [lng, setlng] = useState('');
  const [weathericon, setweathericon] = useState('');
  const [weathername, setweathername] = useState('');
  const [weathericon2, setweathericon2] = useState('');
  const [weathername2, setweathername2] = useState('');
  const [weatheralert, setweatheralert] = useState(0);
  const [weatheralert2, setweatheralert2] = useState(0);
  const [weatheralert3, setweatheralert3] = useState(null);
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
  
  const componentDidMount = () => {
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
  };
 
  useEffect(() => {
    componentDidMount()
    if(istrue){
    if(lat !== '' && lng !== ''){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=Kr&appid=${API}`)
      .then((responseData) => {
        const data = responseData.data;
        setweather({
          id: data.weather[0].id,
          temperature: `${(data.main.temp-273.15).toFixed(1)}℃`,
          main: data.weather[0].main,
          description: data.weather[0].description,
          loading: false,
          name: data.name,
        });
      });
     }} 
     return ()=>{
      setistrue(false);
     }
 }, [istrue ,lat ,lng]);


  
 useEffect(() => {
  componentDidMount()
  if(istrue2){
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
   }} 
   return ()=>{
    setistrue2(false);
   }
}, [istrue2,lat,lng]);

useEffect(() => {
  if ((weather.id >= 200) && (weather.id <= 250)){
    setweathericon(<BoltIcon/>) 
    setweathername('천둥번개')
    setweatheralert(1)
  }
  if ((weather.id >= 300) && (weather.id <= 350)){
    setweathericon(<UmbrellaIcon/>) 
    setweathername('이슬비')
    setweatheralert('라이딩이 위험할 수 있어요!')
  }
  if ((weather.id >= 500) && (weather.id <= 550)){
    setweathericon(<UmbrellaIcon/>) 
    setweathername('비')
    setweatheralert('라이딩이 위험할 수 있어요!')
  }
  if ((weather.id >= 600) && (weather.id <= 650)){
    setweathericon(<AcUnitIcon/>) 
    setweathername('눈')
    setweatheralert('라이딩이 위험할 수 있어요!')
  }
  if ((weather.id >= 700) && (weather.id <= 750)){
    setweathericon(<WaterIcon/>) 
    setweathername('안개')
    setweatheralert('라이딩이 위험할 수 있어요!')
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
    setweatheralert('라이딩이 위험할 수 있어요!')
  }
  if ((weather.id >= 951) && (weather.id <= 955)){
    setweathericon(<AirIcon/>) 
    setweathername('바람')
  }
  if ((weather.id >= 956) && (weather.id <= 959)){
    setweathericon(<AirIcon/>) 
    setweathername('강풍')
    setweatheralert('라이딩이 위험할 수 있어요!')
  }
  if ((weather.id >= 957) && (weather.id <= 1000)){
    setweathericon(<DangerousIcon/>) 
    setweathername('위험')
    setweatheralert('라이딩이 위험할 수 있어요!')
  }
}, [weather]);

useEffect(() => {
  if ((weather2.id >= 200) && (weather2.id <= 250)){
    setweathericon2(<BoltIcon/>) 
    setweathername2('천둥번개')
    setweatheralert2('라이딩이 위험할 수 있어요!')
  }
  if ((weather2.id >= 300) && (weather2.id <= 350)){
    setweathericon2(<UmbrellaIcon/>) 
    setweathername2('이슬비')
    setweatheralert2('라이딩이 위험할 수 있어요!')
  }
  if ((weather2.id >= 500) && (weather2.id <= 550)){
    setweathericon2(<UmbrellaIcon/>) 
    setweathername2('비')
    setweatheralert2('라이딩이 위험할 수 있어요!')
  }
  if ((weather2.id >= 600) && (weather2.id <= 650)){
    setweathericon2(<AcUnitIcon/>) 
    setweathername2('눈')
    setweatheralert2('라이딩이 위험할 수 있어요!')
  }
  if ((weather2.id >= 700) && (weather2.id <= 750)){
    setweathericon2(<WaterIcon/>) 
    setweathername2('안개')
    setweatheralert2('라이딩이 위험할 수 있어요!')
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
    setweatheralert2('라이딩이 위험할 수 있어요!')
  }
  if ((weather2.id >= 951) && (weather2.id <= 955)){
    setweathericon2(<AirIcon/>) 
    setweathername2('바람')
  }
  if ((weather2.id >= 956) && (weather2.id <= 959)){
    setweathericon2(<AirIcon/>) 
    setweathername2('강풍')
    setweatheralert2('라이딩이 위험할 수 있어요!')
  }
  if ((weather2.id >= 957) && (weather2.id <= 1000)){
    setweathericon2(<DangerousIcon/>) 
    setweathername2('위험')
    setweatheralert2('라이딩이 위험할 수 있어요!')
  }
}, [weather2]);

useEffect(() => {
  if(weathername !== '' || weathername2 !== ''){
  if (weathername !== '맑음' || weathername2 !== '맑음' ){
    setweatheralert3('라이딩이 위험할 수 있어요!')
  }else{
    setweatheralert3(null)
  }}
}, [weathername,weathername2]);

  const [walert, setwAlert] = useState(false)
useEffect(() => {
  if(weatheralert !== 0 && weatheralert2 !== 0){
  setTimeout(() => {
    setwAlert(true)
  }, 1000);
  }
}, [weatheralert, weatheralert2])


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
{window.ReactNativeWebView && <Button onClick={onClickRiding} variant='outlined' color='inherit' sx={{mt:1, mb:2, width:'100%', color:'text.primary'}} >라이딩 시작하기</Button>}
  {weather && 
  <Card sx={{width:'100%' , border:1, borderColor:'darkgray'}}>
  <Stack direction='row'>
  <Appweathercontent weather={weather} weathername={weathername} weathericon={weathericon}/>
  <Appweathercontent2 weather={weather2} weathername={weathername2} weathericon={weathericon2}/>
  {walert && <Grid item xs={12} xl={12}>
  {weathername !== weathername2 
  && <Alert severity="info" sx={{ml:1,mr:1,mb:1}}>3시간뒤에 날씨가 달라질 수 있어요!</Alert>}      
  {weatheralert3 !== null &&
   <Alert severity="warning" sx={{ml:1,mr:1}}>{weatheralert3}</Alert>}
  </Grid>}
  </Stack>
  </Card>}
  {!weather && 
  <>
  <Grid item xs={12} xl={12}>
  <Card  sx={{height:150, alignItems:'center', justifyContent:'center'}}>
    <Stack direction='column' alignItems='center' justifyContent='center'>
      <Alert severity="info" sx={{mt:2}}>
      날씨를 불러오고 있어요
      </Alert>
    </Stack>
  </Card>
  </Grid>
  </>}
</Grid>
</> 
);
}
