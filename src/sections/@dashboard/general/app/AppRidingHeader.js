import * as React from 'react';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography, Paper, Box } from '@mui/material';
import AppRidingHome from './AppRidingHome';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import AppHeaderSpace from './AppHeaderSpace';
import useResponsive from '../../../../hooks/useResponsive';
import AppRidingClub from './AppRidingClub';
import { Appgarage } from '../../user/appmobile';

export default function AppRidingHeader() {
  const isDesktop = useResponsive('up', 'lg');
  const [value, setValue] = useState(sessionStorage.getItem('ridingheader'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (sessionStorage.getItem('ridingheader')) {
      setValue(sessionStorage.getItem('ridingheader'));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('ridingheader', value);
  }, [value]);

  const ACCOUNT_TABS = [
    {
      value: 'home',
      component: <AppRidingHome />,
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
      component: <GeneralMap />,
    },
  ];

  const valueStyle = {
    borderBottom: 2,
    borderBottomColor: 'text.primary',
  };

  return (
    <>
      {isDesktop && (
        <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                라이딩
              </Typography>
            }
            value="home"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                딩스타
              </Typography>
            }
            value="dingsta"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                포스트
              </Typography>
            }
            value="post"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                클럽
              </Typography>
            }
            value="club"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                지도
              </Typography>
            }
            value="map"
          />
        </BottomNavigation>
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
      <AppHeaderSpace />
      {ACCOUNT_TABS.map((button) => {
        const isMatched = button.value === value;
        return isMatched && <div key={button.value}>{button.component}</div>;
      })}
    </>
  );
}
