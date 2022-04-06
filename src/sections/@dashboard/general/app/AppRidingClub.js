import * as React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography } from '@mui/material';
import AppHeaderSpace from './AppHeaderSpace';


export default function AppRidingClub() {
  const navigate = useNavigate()
  const [value, setValue] = useState('clublist');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };


  
  
    const ACCOUNT_TABS = [
      {
        value: 'clublist',
        component: '사랑해요 ㅅ',
      },      
      {
        value: 'myclub',
        component: '사랑해요 연애가중개',
      },
      {
        value: 'newclub',
        component: '새 클럽',
      },
    ];

    
  return (
    <>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
        label={<Typography variant='subtitle2' color={value === 'clublist' ? 'text.primary' : 'disable'} fontWeight='bold'>클럽목록</Typography>}
        value="clublist" />

    <BottomNavigationAction
        label={<Typography variant='subtitle2' color={value === 'myclub' ? 'text.primary' : 'disable'} fontWeight='bold'>나의클럽</Typography>}
        value="myclub" />

      <BottomNavigationAction
        label={<Typography variant='subtitle2' color={value === 'newclub' ? 'text.primary' : 'disable'} fontWeight='bold'>클럽만들기</Typography>}
        value="newclub" 
        onClick = {()=> navigate('/dashboard/club/clubnew')} />
    </BottomNavigation>
    <AppHeaderSpace />
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value} >{button.component}</div>;
        })}
     </>
  );
}
