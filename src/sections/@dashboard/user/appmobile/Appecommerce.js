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
// -----------------------------------------
import { useNavigate } from 'react-router-dom';
import { Card, Paper, Stack, Grid, Typography, Box, CardHeader } from '@mui/material';
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
     <Card>
       <CardHeader title='Category' sx={{mb:1}}/>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="신차"
        value="e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="부품"
        value="e-commerce/motocyclegear"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="튜닝"
        value="e-commerce/motocycleparts"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="케미컬"
        value="e-commerce/motocycle"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="용품" 
        value="e-commerce/motocycle" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="헬멧"
        value="used-e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="자켓"
        value="used-e-commerce/motocyclegarage"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="바지"
        value="used-e-commerce/motocyclegarage"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="장갑"
        value="used-e-commerce/motocyclegear"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="부츠" 
        value="used-e-commerce/motocycleparts" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="슈트"
        value="used-e-commerce/motocycle"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="가방"
        value="used-e-commerce/motocyclegarage"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="블루투스"
        value="used-e-commerce/motocyclegarage"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="거치대"
        value="used-e-commerce/motocyclegear"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="기타" 
        value="used-e-commerce/motocycleparts" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    </Card>
    <Card>
    <CardHeader title='Recommend' sx={{mb:1}}/>
    <Appmobileshopitem />
    </Card>
    <Card>
    <CardHeader title='Best' sx={{mb:1}}/>
    <Appmobileshopitem2 />
    </Card>
    <Card>
    <CardHeader title='New' sx={{mb:1}}/>
    <Appmobileshopitem3 />
    </Card>
    </Stack>
    </Grid>
    </Grid>
  );
}
