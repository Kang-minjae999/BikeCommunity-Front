import * as React from 'react';
import {useEffect, useState} from 'react';
// -----------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// -----------------------------------------
import AddchartIcon from '@mui/icons-material/Addchart';
import MapIcon from '@mui/icons-material/Map';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ListIcon from '@mui/icons-material/List';
// -----------------------------------------
import { useNavigate } from 'react-router-dom';
import { Stack, Grid, Typography,  Divider } from '@mui/material';


export default function Appgarage() {
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
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary' fontWeight='bold'>정비기록</Typography>}
        value="garage/record"
        icon={<AddchartIcon color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary' fontWeight='bold'>찾기</Typography>}
        value="garage/map"
        icon={<MapIcon color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary' fontWeight='bold'>정비질문</Typography>}
        value="garage/ask"
        icon={<HelpCenterIcon color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary' fontWeight='bold'>정비예약</Typography>}
        value="garage/reservation"
        icon={<EngineeringIcon color='action'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary' fontWeight='bold'>후기</Typography>}
        value="garage/review"
        icon={<ListIcon color='action' />}
      />
    </BottomNavigation>
    <Divider/>
    </Stack>
    </Grid>
    </Grid>
  );
}
