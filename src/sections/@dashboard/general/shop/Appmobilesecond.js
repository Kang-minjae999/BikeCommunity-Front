import * as React from 'react';
import {useEffect, useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { Card, Paper } from '@mui/material';


export default function Appmobilesecond() {
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
    <Card>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="중고바이크"
        value="used-e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="라이딩지도"
        value="map"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="홈"
        value="app"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="게시판"
        value="board/motocycle"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="프로필" 
        value="user/account" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="중고바이크"
        value="used-e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="라이딩지도"
        value="map"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="홈"
        value="app"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="게시판"
        value="board/motocycle"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="프로필" 
        value="user/account" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="중고바이크"
        value="used-e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="라이딩지도"
        value="map"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="홈"
        value="app"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="게시판"
        value="board/motocycle"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="프로필" 
        value="user/account" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="중고바이크"
        value="used-e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="라이딩지도"
        value="map"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="홈"
        value="app"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="게시판"
        value="board/motocycle"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="프로필" 
        value="user/account" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    
    </Card>
  );
}
