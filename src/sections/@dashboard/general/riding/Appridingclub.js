import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import Iconify from '../../../../components/Iconify';
import ClubDingstas from '../../../../pages/dashboard/ClubDingstas';
import ClubList from '../../../../pages/dashboard/ClubList';

export default function Appridingclub() {
  const navigate = useNavigate()

  const {icon} = useParams();

  const [open, setopen] = useState(icon)

  useEffect(() => {
    setopen(icon)
  }, [icon])

  return (
<>  
    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{mx:2}}>   
        <Button variant='outlined' size='large' onClick={() =>  navigate(`/dashboard/riding/club/dingsta`)} color='inherit' sx={{mb:2}}>
          <Iconify icon='ant-design:camera-outlined' sx={open === 'dingsta' ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'text.disabled'}}/>
        </Button>      
        <Button variant='outlined' size='large' onClick={() => navigate(`/dashboard/riding/club/list`)} color='inherit' sx={{mb:2}}>
          <Iconify icon='ant-design:profile-outlined' sx={open === 'list' ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'text.disabled'}}/>
        </Button> 
    </Stack>
        {open === 'dingsta' && <><ClubDingstas /></>}  
        {open === 'list' && <><ClubList /></>}
</> 
);
}
