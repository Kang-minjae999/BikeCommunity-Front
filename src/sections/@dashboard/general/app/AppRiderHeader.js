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

export default function AppRidingHeader() {
  const isDesktop = useResponsive('up', 'lg');
  const navigate = useNavigate();
  const {value} = useParams();

  useEffect(() => {
    if(!value){
      navigate(`/dashboard/rider/bikep`);
    }
  })
  
  const handleChange = (event, newValue) => {
    navigate(`/dashboard/rider/${newValue}`);
  };



  const ACCOUNT_TABS = [
    {
      value: 'bikep',
      component: <Appgarage />,
    },
    {
      value: 'emergency',
      component: <BlogDingstas />,
    },
    {
      value: 'lorry',
      component: <BlogPosts />,
    },
    {
      value: 'crash',
      component: <AppRidingClub />,
    },
    {
      value: 'insurance',
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
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'bikep' && valueStyle)}}>
                바프
              </Typography>
            }
            value="bikep"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'emergency' && valueStyle)}}>
                긴급출동
              </Typography>
            }
            value="emergency"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'lorry' && valueStyle)}}>
                용달
              </Typography>
            }
            value="lorry"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'crash' && valueStyle)}}>
                사고처리
              </Typography>
            }
            value="crash"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'insurance' && valueStyle)}}>
                보험
              </Typography>
            }
            value="insurance"
          />
        </BottomNavigation>
        <Divider />
        </>
      )}
      {!isDesktop && (
        <Paper sx={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex: 50 }} elevation={1}>
          <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
              sx={{ ...(value === 'bikep' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'bikep' ? "text.primary" : 'disabled'} fontWeight="bold">
                  바프
                </Typography>
              }
              value="bikep"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'emergency' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'emergency' ? "text.primary" : 'disabled'} fontWeight="bold">
                  긴급출동
                </Typography>
              }
              value="emergency"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'lorry' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'lorry' ? "text.primary" : 'disabled'} fontWeight="bold">
                  용달
                </Typography>
              }
              value="lorry"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'crash' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'crash' ? "text.primary" : 'disabled'} fontWeight="bold">
                  사고처리
                </Typography>
              }
              value="crash"
            />
            <BottomNavigationAction
              sx={{ ...(value === 'insurance' && valueStyle) }}
              label={
                <Typography variant="subtitle3" color={value === 'insurance' ? "text.primary" : 'disabled'}  fontWeight="bold">
                  보험
                </Typography>
              }
              value="insurance"
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
