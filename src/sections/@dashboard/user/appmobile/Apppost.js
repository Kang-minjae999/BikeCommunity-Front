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
// -----------------------------------------
import { useNavigate } from 'react-router-dom';
import { Card, Paper, Stack, Grid, Typography, Box, CardHeader, Divider } from '@mui/material';
import EcommerceShop from '../../../../pages/dashboard/EcommerceShop';
import { AppFeatured } from '../../general/app';
import  Appecommerce2  from './Appecommerce2';
import { BlogPostRecent } from '../../blog';
import Image from '../../../../components/Image';
import { AboutTeamapp } from '../../../about';
import { Appmobileshopitem,Appmobileshopitem2,Appmobileshopitem3 } from '.';


export default function Apphome() {
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
       <Stack spacing={1}>
       <CardHeader title='Blog' sx={{mb:1}}/>
       <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
       <BottomNavigationAction
        label="공지사항"
        value="blog/notice"
        icon={<AnnouncementIcon />}
      />
        <BottomNavigationAction
        label="포스트"
        value="blog/posts"
        icon={<PhotoFilterIcon />}
      />
      <BottomNavigationAction
        label="딩스타"
        value="blog/insta"
        icon={<PhotoIcon />}
      />
    </BottomNavigation> 
    <Divider/>

{/*     <CardHeader title='Recommend' sx={{mb:1}}/>
    <Appmobileshopitem />
    <Divider/>
    <CardHeader title='Best' sx={{mb:1}}/>
    <Appmobileshopitem2 />
    <Divider/>
    <CardHeader title='New' sx={{mb:1}}/>
    <Appmobileshopitem3 /> */}
    </Stack>
    </Grid>
    </Grid>
  );
}
