import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// ------------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography } from '@mui/material';
import Iconify from '../../../components/Iconify';


export default function LabelBottomNavigation() {
  const navigate = useNavigate();

  const {pathname} = useLocation()

  const isHome = pathname.includes('app')
  const isShop = pathname.includes('garages')
  const isRiding = pathname.includes('riding')
  const isRider = pathname.includes('rider')
  const isMy = pathname.includes('mypage')


  return (
    <> 
    <BottomNavigation showLabels sx={{ width: '100%' ,height:'1%'}}  >
      <BottomNavigationAction
        label={<Typography variant='body3' color={isHome ? 'text.primary' : 'disabled'} >HOME</Typography>}
        value="app"
        icon={<Iconify icon='ant-design:home-outlined' sx={isHome ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />}
        onClick={() => navigate(`/dashboard/app/home`)}
      />
      <BottomNavigationAction
        label={<Typography variant='body3' color={isShop ? 'text.primary' : 'disabled'} >정비</Typography>}
        value="garages"
        icon={<Iconify icon='ant-design:tool-outlined' sx={isShop ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />}
        onClick={() => navigate(`/dashboard/garages/garage`)}
      />
      <BottomNavigationAction
        label={<Typography variant='body3' color={isRiding ? 'text.primary' : 'disabled'} >라이딩</Typography>}
        value="riding"
        icon={<Iconify icon='ant-design:camera-outlined' sx={isRiding ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />}
        onClick={() => navigate(`/dashboard/riding/map/ridingmap`)}
      />
      <BottomNavigationAction 
        label={<Typography variant='body3' color={isRider ? 'text.primary' : 'disabled'} >라이더</Typography>}
        value="rider" 
        icon={<Iconify icon='ant-design:profile-outlined' sx={isRider ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />} 
        onClick={() => navigate(`/dashboard/rider/rent`)}/>
      <BottomNavigationAction
        label={<Typography variant='body3' color={isMy ? 'text.primary' : 'disabled'} >마이페이지</Typography>}
        value="mypage"
        icon={<Iconify icon='ant-design:smile-outlined' sx={isMy ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />}
        onClick={() => navigate(`/dashboard/mypage/prof/gallery`)}
      />
    </BottomNavigation>
    </>
  );
}
