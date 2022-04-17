import * as React from 'react';
import {useEffect, useState} from 'react';
// ------------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';


export default function LabelBottomNavigation() {
  const [value, setValue] = useState('');
  const [go, setGo] = useState(false)
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setGo(true)
  };

  useEffect(() => {
    if(sessionStorage.getItem('first') !== 'yes'){
      sessionStorage.setItem('first', 'yes')
      sessionStorage.setItem('homeheader', 'home')
      sessionStorage.setItem('shopheader', 'all')
      sessionStorage.setItem('ridingheader', 'home')
      sessionStorage.setItem('riderheader', 'home')
    } 
}, [])

  useEffect(() => {
    if(go){
      navigate(`/dashboard/${value}`)
    } return () => setGo(false) + setValue('')
    }, [value, go]); 



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
        value="shop/all/all/0"
        icon={<StoreIcon  color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>라이딩</Typography>}
        value="riding"
        icon={<TwoWheelerIcon color='action' />}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>라이더</Typography>}
        value="rider"
        icon={<SportsMotorsportsIcon color='action' />}
      />
      <BottomNavigationAction 
        label={<Typography variant='body2' color='text.primary'>마이페이지</Typography>}
        value="mypage" 
        icon={<AccountBoxIcon  color='action'/>} />
    </BottomNavigation>
    </>
  );
}
