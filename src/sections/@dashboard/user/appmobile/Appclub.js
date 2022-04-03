import * as React from 'react';
import {useEffect, useState} from 'react';
// -----------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// -----------------------------------------
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import GroupsIcon from '@mui/icons-material/Groups';
// -----------------------------------------
import { useNavigate } from 'react-router-dom';
import {  Stack, Grid, Typography, Divider } from '@mui/material';


export default function Appclub() {
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
    }, [valuetrue, value, link]); 
 

  return (
    <Grid container spacing={1}>
     <Grid item xs={12} md={12}>
       <Stack spacing={1} sx={{mt:1}}>
       <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange} >
       <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary' fontWeight='bold'>나의클럽</Typography>}
        value="riding"
        icon={<GroupsIcon color='action'/>}
      />
        <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary' fontWeight='bold'>클럽만들기</Typography>}
        value="club/clubnew"
        icon={<PhotoFilterIcon color='action'/>}
      />
    </BottomNavigation> 
    <Divider/>
    </Stack>
    </Grid>
    </Grid>
  );
}
