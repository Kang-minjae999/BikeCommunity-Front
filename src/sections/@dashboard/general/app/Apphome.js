import * as React from 'react';
import {useEffect, useState} from 'react';
// -----------------------------------------
import { useTheme } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// -----------------------------------------
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// -----------------------------------------
import { useNavigate } from 'react-router-dom';
import { Card, Paper, Stack, Grid, CardHeader } from '@mui/material';
import { AppFeatured } from '.';


export default function Apphome() {
  const [value, setValue] = useState('');
  const [valuetrue, setvaluetrue] = useState(false);
  const link = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setvaluetrue(true);
  };

  
  const theme = useTheme();


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
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
      <Card>
      <CardHeader title='Weather'/>

      </Card>
      </Grid>

     <Grid item xs={12} md={12}>
      <AppFeatured/>
      </Grid>
     <Grid item xs={12} md={12}>
       <Stack spacing={1}>
     <Card>
       <CardHeader title='Riding' sx={{mb:1}}/>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="나의클럽"
        value="e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="클럽찾기"
        value="e-commerce/motocyclegear"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="클럽생성"
        value="e-commerce/motocycleparts"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="클럽사진"
        value="e-commerce/motocycle"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="클럽위치" 
        value="e-commerce/motocycle" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="위치기록"
        value="used-e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="나의사진"
        value="used-e-commerce/motocyclegarage"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="사진기록"
        value="used-e-commerce/motocyclegarage"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="공유기록"
        value="used-e-commerce/motocyclegear"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="지도" 
        value="used-e-commerce/motocycleparts" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    </Card>
    </Stack>
    </Grid>
    </Grid>
  );
}
