import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import { WEATHER_API } from '../../../../config';
import Appweather from './Appweather';

// ----------------------------------------------------------------------
AppRidingHome.propTypes = {
  tab: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
  userPo: PropTypes.object,
  lat: PropTypes.number,
  lng: PropTypes.number,
  setlat: PropTypes.func,
  setlng: PropTypes.func,
}; 

export default function AppRidingHome({tab, state, setState, userPo, lat, lng, setlat, setlng}) {
  const [weather, setweather] = useState({});
  const [weather2, setweather2] = useState({});

  useEffect(() => {
    if(window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({type:'onWeather'}))}
  }, []);

  const [data , setdata] = useState(undefined);

  const listner = useCallback((event) => {
  setdata(JSON.parse(event.data))
  setlat(data[0])
  setlng(data[1])
  }, [setlat, setlng, data])

  // android
  useEffect(() => {
    document.addEventListener('message', listner)
    return () => {document.removeEventListener('message', listner);}
  });
  // ios
  useEffect(() => {
    window.addEventListener('message', listner)
    return () => {window.removeEventListener('message', listner);}
    });

  
  const componentDidMount = useCallback(() => {
    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition((position) => {
      setlat(position.coords.latitude);
      setlng(position.coords.longitude);})
    }
  },[setlat, setlng])
 
  useEffect(() => {
    componentDidMount()
    if(lat !== '' && lng !== ''){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=Kr&appid=${WEATHER_API}`)
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
 }, [lat ,lng, componentDidMount]);


  
 useEffect(() => {
  componentDidMount()
  if(lat !== '' && lng !== ''){
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&lang=Kr&cnt=2&appid=${WEATHER_API}`)
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
}, [lat,lng, componentDidMount]);


  return (
    <>
    <Container>
    <Appweather weather={weather} weather2={weather2} />
    <GeneralMap tab={tab} state={state} setState={setState} userPo={userPo} />
    </Container>
    </>
  );
}
