import PropTypes from 'prop-types';
import {useEffect, useState} from 'react'
import axios from 'axios';
import {  Box,  Grid } from '@mui/material';
// -----------------------------------------
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BoltIcon from '@mui/icons-material/Bolt';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterIcon from '@mui/icons-material/Water';
import DangerousIcon from '@mui/icons-material/Dangerous';
import AirIcon from '@mui/icons-material/Air';
// ----------------------------------------
import Appweathercontentride from '../general/riding/Appweathercontentride';
import Appweathercontent2ride from '../general/riding/Appweathercontent2ride';
// ----------------------------------------------------------------------
GeneralMapweather.propTypes = {
  wealat: PropTypes.string,
  wealng: PropTypes.string,
  weatherok: PropTypes.bool,
  name: PropTypes.string,
};


export default function GeneralMapweather({wealat, wealng, weatherok, name}) {
  const API = 'ac90d9bee65995d552b23505a49fb30a'
  const [lat, setlat] = useState('');
  const [lng, setlng] = useState('');
  const [weathericon, setweathericon] = useState('');
  const [weathername, setweathername] = useState('');
  const [weathericon2, setweathericon2] = useState('');
  const [weathername2, setweathername2] = useState('');
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
        const datas = responseData.data
        setweather({
          id: datas.weather[0].id,
          temperature: `${(datas.main.temp-273.15).toFixed(1)}℃`,
          main: datas.weather[0].main,
          description: datas.weather[0].description,
          loading: false,
          name: datas.name,
        });
      });
     }} 
     return ()=>{
      setistrue(false);
      setlat('');
      setlng('');
     }
 }, [lat ,lng, istrue]);


  
 useEffect(() => {
  componentDidMount()
  if(istrue && lat !== '' && lng !== ''){
  if(lat !== '' && lng !== ''){
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&lang=Kr&cnt=1&appid=${API}`)
    .then((responseData) => {
      const datas = responseData.data; 
      setweather2({
        id: datas.list[0].weather[0].id,
        temperature: `${(datas.list[0].main.temp-273.15).toFixed(1)}℃`,
        main: datas.list[0].weather[0].main,
        description: datas.list[0].weather[0].description,
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
}, [lat,lng, istrue]);

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
</Grid>
</Box>
</> 
);
}
