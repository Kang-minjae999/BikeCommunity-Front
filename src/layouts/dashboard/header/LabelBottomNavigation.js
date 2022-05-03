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
  const isShop = pathname.includes('shop')
  const isRiding = pathname.includes('riding')
  const isRider = pathname.includes('rider')
  const isMypage = pathname.includes('mypage')


  return (
    <> 
    <BottomNavigation showLabels sx={{ width: '100%' ,height:'1%'}}  >
    <BottomNavigationAction
        label={<Typography variant='body3' color={isHome ? 'text.primary' : 'disabled'} >HOME</Typography>}
        value="app"
        icon={<Iconify icon='ant-design:home-outlined' sx={isHome ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />}
        onClick={() => navigate(`/dashboard/app`)}
      />
      <BottomNavigationAction
        label={<Typography variant='body3' color={isShop ? 'text.primary' : 'disabled'} >거래</Typography>}
        value="shop/all/all/0"
        icon={<Iconify icon='ant-design:shopping-outlined' sx={isShop ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />}
        onClick={() => navigate(`/dashboard/shop/all/all/0`)}
      />
      <BottomNavigationAction
        label={<Typography variant='body3' color={isRiding ? 'text.primary' : 'disabled'} >라이딩</Typography>}
        value="riding"
        icon={<Iconify icon='ant-design:camera-outlined' sx={isRiding ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />}
        onClick={() => navigate(`/dashboard/riding`)}
      />
      <BottomNavigationAction
        label={<Typography variant='body3' color={isRider ? 'text.primary' : 'disabled'} >라이더</Typography>}
        value="rider"
        icon={<Iconify icon='ant-design:profile-outlined' sx={isRider ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />}
        onClick={() => navigate(`/dashboard/rider`)}
      />
      <BottomNavigationAction 
        label={<Typography variant='body3' color={isMypage ? 'text.primary' : 'disabled'} >마이페이지</Typography>}
        value="mypage" 
        icon={<Iconify icon='ant-design:user-outlined' sx={isMypage ? {width:28, height:28, color:'text.primary'} : {width:28, height:28, color:'disabled'}} />} 
        onClick={() => navigate(`/dashboard/mypage`)}/>
    </BottomNavigation>
    </>
  );
}
