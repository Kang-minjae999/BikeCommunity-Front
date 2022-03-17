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


export default function LabelTopNavigation() {
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
    <Paper sx={{ position: 'fixed', top: 50, left: 0, right: 0 }} elevation={1}>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
        label={<Typography variant='h6'>Home</Typography>}
        value="app"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'>Shop</Typography>}
        value="market/all"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'>Used</Typography>}
        value="marketu/all"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'>Garage</Typography>}
        value="garages"
      />
      <BottomNavigationAction 
        label={<Typography variant='h6'>Club</Typography>}
        value="clubs" 
        />
    </BottomNavigation>
    </Paper>
{/*      <Paper sx={{ position: 'fixed', top: 50, left: 0, right: 0 }} elevation={1}>
        <Appmobileheader/>
    </Paper>  */}
    </>
  );
}
