import react, {useEffect, useState} from 'react'
import axios from 'axios';
import { Alert, Box, Card, Grid, Typography } from '@mui/material';
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
import Appweathercontentride from '../../sections/@dashboard/general/app/Appweathercontentride';
import Appweathercontent2ride from '../../sections/@dashboard/general/app/Appweathercontent2ride';





// ----------------------------------------------------------------------

export default function GeneralMapweather({wealat,wealng,weatherok,setweatherok , name}) {
  const API = 'ac90d9bee65995d552b23505a49fb30a'
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
  
  
   const componentDidMount = () => {
    setistrue(true)
  }; 
  useEffect(() => {
    setlat(wealat)
    setlng(wealng)
  }, [wealat,wealng]);

  useEffect(() => {
    setistrue(weatherok)
  }, [weatherok]);
 
  useEffect(() => {
    componentDidMount()
    if(istrue && lat !== '' && lng !== ''){
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
      setlat('');
      setlng('');
     }
 }, [lat ,lng]);


  
 useEffect(() => {
  componentDidMount()
  if(istrue && lat !== '' && lng !== ''){
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
    setistrue(false);
    setlat('');
    setlng('');
   }
}, [lat,lng]);

useEffect(() => {
  if ((weather.id >= 200) && (weather.id <= 250)){
    setweathericon(<BoltIcon/>) 
    setweathername('천둥번개')
    setweatheralert('라이딩이 위험할 수 있어요!')
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



  return (
<>
<Box sx={{ mb:1}}>
<Grid container >
  <Grid item xs={6} lx={6}>
  <Appweathercontentride namek={name} weather={weather} weathername={weathername} weathericon={weathericon}/>
  </Grid>
  <Grid item xs={6} lx={6}>
  <Appweathercontent2ride namek={name} weather={weather2} weathername={weathername2} weathericon={weathericon2}/>
  </Grid>
  <Grid item xs={12} lx={12}>
  {weathername !== weathername2 
  ? <Alert severity="success" sx={{ml:1,mr:1,mb:1}}>3시간뒤에 날씨가 달라질 수 있어요!</Alert> 
  : ''}   
  {weatheralert3 !== null &&
   <Alert severity="warning" sx={{ml:1,mr:1}}>{weatheralert3}</Alert>}
</Grid>
</Grid>
</Box>
</> 
);
}
