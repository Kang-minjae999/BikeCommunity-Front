import * as React from 'react';
import {useEffect, useState} from 'react';
// -----------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// -----------------------------------------
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddchartIcon from '@mui/icons-material/Addchart';
import MapIcon from '@mui/icons-material/Map';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ListIcon from '@mui/icons-material/List';
// -----------------------------------------
import { useNavigate } from 'react-router-dom';
import { Card, Paper, Stack, Grid, Typography, Box, CardHeader, Divider } from '@mui/material';
import EcommerceShop from '../../../../pages/dashboard/EcommerceShop';
import { AppFeatured } from '../../general/app';
import  Appecommerce2  from './Appecommerce2';
import { BlogPostRecent } from '../../blog';
import BlogPostRecentapp from '../../blog/BlogPostRecentapp';
import Image from '../../../../components/Image';
import { AboutTeamapp } from '../../../about';
import { Appmobileshopitem,Appmobileshopitem2,Appmobileshopitem3 } from '.';


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
    }, [valuetrue]); 
 

  return (
    <Grid container spacing={1}>
     <Grid item xs={12} md={12}>
       <Stack spacing={1} sx={{mt:1}}>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>정비기록</Typography>}
        value="garage/record"
        icon={<AddchartIcon color='primary'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>찾기</Typography>}
        value="garage/map"
        icon={<MapIcon color='primary'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>정비질문</Typography>}
        value="garage/ask"
        icon={<HelpCenterIcon color='primary'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>정비예약</Typography>}
        value="garage/reservation"
        icon={<EngineeringIcon color='primary'/>}
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>후기</Typography>}
        value="garage/review"
        icon={<ListIcon color='primary' />}
      />
    </BottomNavigation>
    <Divider/>
    </Stack>
    </Grid>
    </Grid>
  );
}
