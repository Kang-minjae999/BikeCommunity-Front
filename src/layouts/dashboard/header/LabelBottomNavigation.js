import * as React from 'react';
import {useEffect, useState} from 'react';
// ------------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';


export default function LabelBottomNavigation() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    navigate(`/dashboard/${value}`)
    }, [value]); 



  return (
    <>
    <BottomNavigation showLabels sx={{ width: '100%' ,height:'1%'}} value={value} onChange={handleChange} >
    <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>홈</Typography>}
        value="app"
        icon={<HomeIcon color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>거래</Typography>}
        value="shop"
        icon={<StoreIcon  color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>모아보기</Typography>}
        value="blog/dingstas"
        icon={<AutoAwesomeMotionIcon color='action' />}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>라이더</Typography>}
        value="riding"
        icon={<TwoWheelerIcon color='action' />}
      />
      <BottomNavigationAction 
        label={<Typography variant='body2' color='text.primary'>마이페이지</Typography>}
        value="mypage" 
        icon={<AccountBoxIcon  color='action'/>} />
    </BottomNavigation>
    </>
  );
}
