import * as React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography,  Stack, Divider, Card } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import GroupsIcon from '@mui/icons-material/Groups';
import Appweather from './Appweather';
import { Appridingclub, Appridingmotocycle } from '../riding';
import RidingProfile from '../../../../pages/dashboard/RidingProfile';


export default function Appriding() {
  const navigate = useNavigate();
  const [value, setValue] = useState('home');
  const [chvalue, setchvalue] = useState('');
  const [istrue ,setistrue] = useState(false);

  const handleChange = (event, newValue) => {
    setchvalue(newValue);
    setistrue(true)
  };

  useEffect(() => {
    if(istrue){
      setValue(chvalue)
      };
    return () => {
      setistrue(false)
    };
  }, [istrue, chvalue]);
  
  const onClick= ()=>{
    navigate(`/dashboard/map`)
  }
  
    const ACCOUNT_TABS = [
      {
        value: 'home',
        component: 
        <><Card><Typography sx={{mt:2,ml:2,mb:2}}>대표 바이크 보여주기 </Typography></Card><Appweather /></>,
      },
      {
        value: 'record',
        component: <RidingProfile />,
      },
      {
        value: 'clubrecord',
        component: <Appridingclub />,
      },
      {
        value: 'motocycle',
        component: <Appridingmotocycle />,
      },
      {
        value: 'map',
        component: '',
      },
    ];

  return (
    <Stack spacing={1} sx={{mt:1}}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary' fontWeight='bold'>라이딩홈</Typography>}
        value="home"
        icon={<HomeIcon color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary' fontWeight='bold'>기록</Typography>}
        value="record"
        icon={<PhotoFilterIcon color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary' fontWeight='bold'>클럽</Typography>}
        value="clubrecord"
        icon={<GroupsIcon color='action'/>}
      />
      <BottomNavigationAction 
        label={<Typography variant='body2' color='text.primary' fontWeight='bold'>바이크</Typography>}
        value="motocycle"
        icon={<TwoWheelerIcon color='action'/>} 
        />
      <BottomNavigationAction 
        label={<Typography variant='body2' color='text.primary' fontWeight='bold'>라이딩맵</Typography>}
        value="map"
        icon={<MapIcon color='action'/>} 
        onClick={onClick}
      />
    </BottomNavigation>
    <Divider />
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
     </Stack>
  );
}
