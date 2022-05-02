import * as React from 'react';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography, Paper, Box, Divider, Container } from '@mui/material';
import AppRidingHome from './AppRidingHome';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import AppHeaderSpace from './AppHeaderSpace';
import useResponsive from '../../../../hooks/useResponsive';
import AppRidingClub from './AppRidingClub';

export default function AppRidingHeader() {
  const isDesktop = useResponsive('up', 'lg');
  const [value, setValue] = useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [lat, setlat] = useState(37.369307716781);
  const [lng, setlng] = useState(126.93850485017);

  const [state, setState] = useState({
    center: {
      lat: 126.9351741,
      lng: 37.3616703,
    },
    errMsg: null,
    isLoading: true,
  })
  
  const [userPo, setUserPo] = useState({      
    center: {
    lat: 126.9351741,
    lng: 37.3616703,
  }})

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, 
              lng: position.coords.longitude, 
            },
            isLoading: false,
          }))
          setUserPo({
            center: {
            lat: position.coords.latitude, 
            lng: position.coords.longitude, 
          }});
          setlat(position.coords.latitude);
          setlng(position.coords.longitude);
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "현재 위치를 알 수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

  // useEffect(() => {
  //   if(!window.Kakao.isInitialized){
  //     window.Kakao.init('b5498e967687f29ac34bb8122dba4130');
  //   }
  // }, [])

  const ACCOUNT_TABS = [
    {
      value: 'home',
      component: <AppRidingHome tab={value} state={state} setState={setState} userPo={userPo} lat={lat} lng={lng} setlat={setlat} setlng={setlng}/>,
    },
    {
      value: 'club',
      component: <AppRidingClub />,
    },
    {
      value: 'dingsta',
      component: <BlogDingstas />,
    },
    {
      value: 'post',
      component: <BlogPosts />,
    },
    {
      value: 'map',
      component: <Container><GeneralMap tab={value} state={state} setState={setState} userPo={userPo}/></Container>,
    },
  ];

  const valueStyle = {
    borderBottom: (isDesktop ? 3 : 2),
    borderBottomColor: 'text.primary',
    fontWeight: 'bold',
  };

  return (
    <>
      {isDesktop && (
        <>
        <Divider />
        <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary"  sx={{ ...(value === 'home' && valueStyle)}}>
                라이딩
              </Typography>
            }
            value="home"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary"  sx={{ ...(value === 'dingsta' && valueStyle)}}>
                딩스타
              </Typography>
            }
            value="dingsta"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary"  sx={{ ...(value === 'post' && valueStyle)}}>
                포스트
              </Typography>
            }
            value="post"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary"  sx={{ ...(value === 'club' && valueStyle)}}>
                클럽
              </Typography>
            }
            value="club"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary"  sx={{ ...(value === 'map' && valueStyle)}}>
                지도
              </Typography>
            }
            value="map"
          />
        </BottomNavigation>
        <Divider sx={{mb:2}} />
        </>
      )}
      {!isDesktop && (
        <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex: 50 }} elevation={1}>
          <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
              sx={{ ...(value === 'home' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  라이딩
                </Typography>
              }
              value="home"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'club' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  클럽
                </Typography>
              }
              value="club"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'dingsta' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  딩스타
                </Typography>
              }
              value="dingsta"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'post' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  포스트
                </Typography>
              }
              value="post"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'map' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  지도
                </Typography>
              }
              value="map"
            />
          </BottomNavigation>
        </Paper>
      )}
      {!isDesktop && <AppHeaderSpace />}
      {ACCOUNT_TABS.map((button) => {
        const isMatched = button.value === value;
        return isMatched && <div key={button.value}>{button.component}</div>;
      })}
    </>
  );
}
