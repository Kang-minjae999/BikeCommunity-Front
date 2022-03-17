import * as React from 'react';
import {useEffect, useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import { Typography,  Stack } from '@mui/material';


export default function Appmobileheader() {
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
        };
    }, [valuetrue]); 

  return (
    <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>Home</Typography>}
        value="app"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>Shop</Typography>}
        value="market/all"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>Used</Typography>}
        value="marketu/all"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>Garage</Typography>}
        value="garages"
      />
      <BottomNavigationAction 
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>Club</Typography>}
        value="clubs" 
        />
    </BottomNavigation>
     </Stack>
  );

}
