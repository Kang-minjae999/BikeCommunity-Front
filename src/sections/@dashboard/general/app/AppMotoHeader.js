import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography, Paper, Divider } from '@mui/material';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
import AppHeaderSpace from './AppHeaderSpace';
import useResponsive from '../../../../hooks/useResponsive';
import AppRidingClub from './AppRidingClub';
import { Appgarage } from '.';
import GarageCardsClean from '../../../../pages/dashboard/GarageCardsClean';

export default function AppRidingHeader() {
  const isDesktop = useResponsive('up', 'lg');
  const navigate = useNavigate()
  const {value} = useParams()

  useEffect(() => {
    if(!value){
      navigate(`/dashboard/motocycle/maintenance`);
    }
  })
  

  const handleChange = (event, newValue) => {
    navigate(`/dashboard/motocycle/${newValue}`);
  };

  const ACCOUNT_TABS = [
    {
      value: 'maintenance',
      component: '하위',
    },
    {
      value: 'rent',
      component: <BlogDingstas />,
    },
    {
      value: 'edu',
      component: <BlogPosts />,
    },
    {
      value: 'clean',
      component: <GarageCardsClean />,
    },
    {
      value: 'test',
      component: <BlogPosts />,
    },
  ];
   // 렌트랑 보험 구인구직 그건 어떰?
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
        <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange} >
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'maintenance' && valueStyle)}}>
                정비
              </Typography>
            }
            value="maintenance"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'rent' && valueStyle)}}>
                렌트
              </Typography>
            }
            value="rent"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'edu' && valueStyle)}}>
                교육
              </Typography>
            }
            value="edu"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'clean' && valueStyle)}}>
                세차
              </Typography>
            }
            value="clean"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'test' && valueStyle)}}>
                환경검사
              </Typography>
            }
            value="test"
          />
        </BottomNavigation>
        <Divider />
        </>
      )}
      {!isDesktop && (
        <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex: 50 }} elevation={1}>
          <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
              sx={{ ...(value === 'maintenance' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'maintenance' ? "text.primary" : 'disabled'} fontWeight="bold">
                  정비
                </Typography>
              }
              value="maintenance"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'rent' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'rent' ? "text.primary" : 'disabled'} fontWeight="bold">
                  렌트
                </Typography>
              }
              value="rent"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'edu' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'edu' ? "text.primary" : 'disabled'} fontWeight="bold">
                  교육
                </Typography>
              }
              value="edu"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'clean' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'clean' ? "text.primary" : 'disabled'} fontWeight="bold">
                  세차
                </Typography>
              }
              value="clean"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'test' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'test' ? "text.primary" : 'disabled'}  fontWeight="bold">
                  환경검사
                </Typography>
              }
              value="test"
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
