import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'axios'
//
import { dispatch } from '../store';
import { WEATHER_API } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isLoadingWeatherOne: false,
  isLoadingWeatherTwo: false,
  error: null,
  userPosition: null,
  weatherOne: null,
  weatherTwo: null,
};

const slice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // 로딩 -----------------------------------------------------------------
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 유저 -----------------------------------------------------------------
    getPositionSuccess(state, action) {
      state.isLoading = false;
      state.userPosition = action.payload;
    },

    getPositionError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 날씨 -----------------------------------------------------------------
    startLoadingWeatherOne(state) {
      state.isLoadingWeatherOne = true;
    },

    startLoadingWeatherTwo(state) {
      state.isLoadingWeatherTwo = true;
    },
    getWeatherSuccessOne(state, action) {
      state.isLoadingWeatherOne = false;
      state.weatherOne = action.payload;
    },
    getWeatherSuccessTwo(state, action) {
      state.isLoadingWeatherTwo = false;
      state.weatherTwo = action.payload;
    },

    getWeatherErrorOne(state, action) {
      state.isLoadingWeatherOne = false;
      state.error = action.payload;
    },
    getWeatherErrorTwo(state, action) {
      state.isLoadingWeatherTwo = false;
      state.error = action.payload;
    },
    // 날씨 -----------------------------------------------------------------
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { 
  name
} = slice.actions;

// ----------------------------------------------------------------------

export function getPosition() {
  return async () => {
    dispatch(slice.actions.startLoading());
    await navigator.geolocation.getCurrentPosition(
    (position) => {
      const userPo = {lat:position.coords.latitude, lng: position.coords.longitude}
      dispatch(slice.actions.getPositionSuccess(userPo));

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${userPo.lat}&lon=${userPo.lng}&lang=Kr&appid=${WEATHER_API}`)
      .then((responseData) => {
      const Data = responseData.data;
      const weather1 = {
        id: Data.weather[0].id,
        temperature: `${(Data.main.temp-273.15).toFixed(1)}℃`,
        }
      dispatch(slice.actions.getWeatherSuccessOne(weather1))
      });

      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${userPo.lat}&lon=${userPo.lng}&lang=Kr&cnt=2&appid=${WEATHER_API}`)
      .then((responseData) => {
        const data = responseData.data.list[0]; 
        const weather2 = {
        id: data.weather[0].id,
        temperature: `${(data.main.temp-273.15).toFixed(1)}℃`,
        }
        dispatch(slice.actions.getWeatherSuccessTwo(weather2) )  
    })},
    (err) => {slice.actions.getPositionError(err)}
    )
  }
}

