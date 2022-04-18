import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Divider, Typography } from '@mui/material';
import useResponsive from '../../../../hooks/useResponsive';


export default function AppRidingClub() {
  const isDesktop = useResponsive('up', 'lg')
  const [value, setValue] = useState('clublist');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
    const ACCOUNT_TABS = [
      {
        value: 'clublist',
        component: '클럽목록',
      },      
      {
        value: 'clubmap',
        component: '클럽지도',
      },
      {
        value: 'myclub',
        component: '나의클럽',
      },
      {
        value: 'newclub',
        component: '새 클럽',
      },
    ];

    const valueStyle = {
      borderBottom:(isDesktop ? 3 :2),
      borderBottomColor: 'text.primary',
      fontWeight:'bold'
    };
  return (
    <>    
    {isDesktop && 
    <>
    <Divider />
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
      label={<Typography variant='body2' color='text.primary' sx={{ ...(value === 'clublist' && valueStyle) }}>클럽목록</Typography>}
      value="clublist"
    />
    <BottomNavigationAction
      label={<Typography variant='body2' color='text.primary' sx={{ ...(value === 'clubmap' && valueStyle) }} >클럽지도</Typography>}
      value="clubmap"
    />
    <BottomNavigationAction
      label={<Typography variant='body2' color='text.primary' sx={{ ...(value === 'myclub' && valueStyle) }}>나의클럽</Typography>}
      value="myclub"
    />
    <BottomNavigationAction
      label={<Typography variant='body2' color='text.primary' sx={{ ...(value === 'newclub' && valueStyle) }}>클럽만들기</Typography>}
      value="newclub"
    />
  </BottomNavigation>
    </>}
  {!isDesktop && 
  <>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
      sx={{ ...(value === 'clublist' && valueStyle) }}
      label={<Typography variant='subtitle2' color={value === 'clublist' ? 'text.primary' : 'inherit'} fontWeight='bold'>클럽목록</Typography>}
      value="clublist"
    />
    <BottomNavigationAction
      sx={{ ...(value === 'clubmap' && valueStyle) }}
      label={<Typography variant='subtitle2' color={value === 'clubmap' ? 'text.primary' : 'inherit'} fontWeight='bold'>클럽지도</Typography>}
      value="clubmap"
    />
    <BottomNavigationAction
      sx={{ ...(value === 'myclub' && valueStyle) }}
      label={<Typography variant='subtitle2' color={value === 'myclub' ? 'text.primary' : 'inherit'} fontWeight='bold'>나의클럽</Typography>}
      value="myclub"
    />
    <BottomNavigationAction
      sx={{ ...(value === 'newclub' && valueStyle) }}
      label={<Typography variant='subtitle2' color={value === 'newclub' ? 'text.primary' : 'inherit'} fontWeight='bold'>클럽만들기</Typography>}
      value="newclub"
    />
  </BottomNavigation>
  </>}
  <Divider />
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value} >{button.component}</div>;
        })}
     </>
  );
}
