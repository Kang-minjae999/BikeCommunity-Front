import * as React from 'react';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography, Paper, Box } from '@mui/material';
import AppRidingHome from './AppRidinghome';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
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
    if(sessionStorage.getItem('ridingheader')){
    setValue(sessionStorage.getItem('ridingheader'))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('ridingheader', value)
  }, [value])

  const ACCOUNT_TABS = [
    {
      value: 'home',
      component: <AppRidingHome />,
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
      value: 'club',
      component: <AppRidingClub />,
    },
    {
      value: 'garage',
      component: <Appgarage />,
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
                정비
              </Typography>
            }
            value="home"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                커스텀
              </Typography>
            }
            value="dingsta"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                면허
              </Typography>
            }
            value="post"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                교육
              </Typography>
            }
            value="garage"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                보험
              </Typography>
            }
            value="club"
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
                  정비
                </Typography>
              }
              value="home"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'dingsta' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  커스텀
                </Typography>
              }
              value="dingsta"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'post' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  면허
                </Typography>
              }
              value="post"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'garage' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  교육
                </Typography>
              }
              value="garage"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'club' && valueStyle) }}
              label={
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  보험
                </Typography>
              }
              value="club"
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
