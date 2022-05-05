import * as React from 'react';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography, Paper, Divider, Container } from '@mui/material';
import AppRidingHome from './AppRidingHome';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import AppHeaderSpace from './AppHeaderSpace';
import useResponsive from '../../../../hooks/useResponsive';
import AppRidingClub from './AppRidingClub';

import { useDispatch, useSelector } from '../../../../redux/store';
import { getPosition } from '../../../../redux/slices/map';

export default function AppRidingHeader() {
  const dispatch = useDispatch();
  const { userPosition, weatherOne, weatherTwo } = useSelector((state) => state.map);
  const isDesktop = useResponsive('up', 'lg');
  const [value, setValue] = useState('home');
  const [state, setState] = useState({
    center: {
      lat: '',
      lng: '',
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    dispatch(getPosition());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ACCOUNT_TABS = [
    {
      value: 'home',
      component: (
        <AppRidingHome
          tab={value}
          state={state}
          setState={setState}
          userPo={userPosition}
          weather1={weatherOne}
          weather2={weatherTwo}
        />
      ),
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
      component: (
        <Container>
          <GeneralMap
            tab={value}
            state={state}
            setState={setState}
            userPo={userPosition}
            weather1={weatherOne}
            weather2={weatherTwo}
          />
        </Container>
      ),
    },
  ];

  const valueStyle = {
    borderBottom: isDesktop ? 3 : 2,
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
                <Typography
                  variant="body2"
                  color={value === 'home' ? 'text.primary' : 'disabled'}
                  sx={{ ...(value === 'home' && valueStyle) }}
                >
                  라이딩
                </Typography>
              }
              value="home"
            />
            <BottomNavigationAction
              label={
                <Typography
                  variant="body2"
                  color={value === 'dingsta' ? 'text.primary' : 'disabled'}
                  sx={{ ...(value === 'dingsta' && valueStyle) }}
                >
                  딩스타
                </Typography>
              }
              value="dingsta"
            />
            <BottomNavigationAction
              label={
                <Typography
                  variant="body2"
                  color={value === 'post' ? 'text.primary' : 'disabled'}
                  sx={{ ...(value === 'post' && valueStyle) }}
                >
                  포스트
                </Typography>
              }
              value="post"
            />
            <BottomNavigationAction
              label={
                <Typography
                  variant="body2"
                  color={value === 'club' ? 'text.primary' : 'disabled'}
                  sx={{ ...(value === 'club' && valueStyle) }}
                >
                  클럽
                </Typography>
              }
              value="club"
            />
            <BottomNavigationAction
              label={
                <Typography
                  variant="body2"
                  color={value === 'map' ? 'text.primary' : 'disabled'}
                  sx={{ ...(value === 'map' && valueStyle) }}
                >
                  지도
                </Typography>
              }
              value="map"
            />
          </BottomNavigation>
          <Divider sx={{ mb: 2 }} />
        </>
      )}
      {!isDesktop && (
        <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex: 50 }} elevation={1}>
          <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
              label={
                <Typography variant="subtitle3" color={value === 'home' ? 'text.primary' : 'disabled'}>
                  라이딩
                </Typography>
              }
              value="home"
              sx={{ ...(value === 'home' && valueStyle) }}
            />
            <BottomNavigationAction
              label={
                <Typography variant="subtitle3" color={value === 'dingsta' ? 'text.primary' : 'disabled'}>
                  딩스타
                </Typography>
              }
              value="dingsta"
              sx={{ ...(value === 'dingsta' && valueStyle) }}
            />
            <BottomNavigationAction
              label={
                <Typography variant="subtitle3" color={value === 'post' ? 'text.primary' : 'disabled'}>
                  포스트
                </Typography>
              }
              value="post"
              sx={{ ...(value === 'post' && valueStyle) }}
            />
            <BottomNavigationAction
              label={
                <Typography variant="subtitle3" color={value === 'club' ? 'text.primary' : 'disabled'}>
                  클럽
                </Typography>
              }
              value="club"
              sx={{ ...(value === 'club' && valueStyle) }}
            />
            <BottomNavigationAction
              label={
                <Typography variant="subtitle3" color={value === 'map' ? 'text.primary' : 'disabled'}>
                  지도
                </Typography>
              }
              value="map"
              sx={{ ...(value === 'map' && valueStyle) }}
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
