import * as React from 'react';
import {useEffect, useState} from 'react';
// ------------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import PhotoIcon from '@mui/icons-material/Photo';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import Appmobileheader from '../../../sections/@dashboard/general/app/Appmobileheader';


export default function LabelBottomNavigation() {
  const [value, setValue] = useState('');
  const [valuetrue, setvaluetrue] = useState(false);
  const link = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setvaluetrue(true);
  };

  useEffect(() => {
    if(valuetrue === true )
    {
    link(`/dashboard/${value}`)
    } 
    return () => {
      setvaluetrue(false)
      setTimeout(() => {setValue('')}, 100);
        };
    }, [valuetrue]); 



  return (
    <>
    <BottomNavigation showLabels sx={{ width: '100%' ,height:'1%'}} value={value} onChange={handleChange} >
    <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>라이딩</Typography>}
        value="riding"
        icon={<TwoWheelerIcon color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>거래</Typography>}
        value="shop"
        icon={<StoreIcon  color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>홈</Typography>}
        value="app"
        icon={<HomeIcon color='action' />}
      />
      <BottomNavigationAction
        label={<Typography variant='body2' color='text.primary'>인스타</Typography>}
        value="blog/dingstas"
        icon={<PhotoFilterIcon color='action' />}
      />
      <BottomNavigationAction 
        label={<Typography variant='body2' color='text.primary'>포스트</Typography>}
        value="blog/posts" 
        icon={<PhotoIcon  color='action'/>} />
    </BottomNavigation>
    </>
  );
}
