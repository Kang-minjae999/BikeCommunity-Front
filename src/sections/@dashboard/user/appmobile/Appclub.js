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
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PhotoIcon from '@mui/icons-material/Photo';
import GroupsIcon from '@mui/icons-material/Groups';
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
    }, [valuetrue]); 
 

  return (
    <Grid container spacing={1}>
     <Grid item xs={12} md={12}>
       <Stack spacing={1} sx={{mt:1}}>
       <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange} >
       <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>나의클럽</Typography>}
        value="riding"
        icon={<GroupsIcon color='primary'/>}
      />
        <BottomNavigationAction
        label={<Typography variant='subtitle2' color='black' fontWeight='bold'>클럽만들기</Typography>}
        value="club/clubnew"
        icon={<PhotoFilterIcon color='primary'/>}
      />
    </BottomNavigation> 
    <Divider/>
    </Stack>
    </Grid>
    </Grid>
  );
}
