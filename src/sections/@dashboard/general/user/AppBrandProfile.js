import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Box, Stack, Typography } from '@mui/material';
import Image from '../../../../components/Image';
// _mock_
import DashboardHeaderForProfile from '../../../../layouts/dashboard/header/indexForProfile';
// sections
import {
  ProfileName,
} from '../../garage/profile';
import useResponsive from '../../../../hooks/useResponsive';
import TabProfile from '../../../../components/TabProfile';


// ----------------------------------------------------------------------

export default function AppBrandProfile() {
  const { nickname } = useParams();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg')

  const ref = useRef()

  const PROFILE_TABS = [
    {
      index: 0,
      value: 'gallery',
      label: '바이크',
      component: 
      <>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      </>,
    },
    {
      index: 1,
      value: 'profile',
      label: '정비글',
      component: 
      <>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      </>,
    },
    {
      index: 2,
      value: 'sell',
      label: '판매중',
      component: 
      <>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      <Typography>확인</Typography>
      </>,
    },
  ];

  const [isOpen, setIsOpen] = useState(false)
  
  const open = () => {
    if(window.scrollY + 53 > ref?.current.offsetTop){
      setIsOpen(true)
    }
    if(window.scrollY + 53 < ref?.current.offsetTop){
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', open)
    return () => {
      window.removeEventListener('scroll', open)
    }
  }, [])
  
  
  useEffect(() => {
    if(!isOpen){
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, ref?.current.offsetTop - 53);
    }
  // eslint-disable-next-line
  }, [pathname]);
  
 const Feature =       
 <Box>         
 <Stack direction='column' alignItems='center' justifyContent='center'>
   <Image ratio='1/1' alt="profile cover" 
   src='https://newsimg.hankookilbo.com/cms/articlerelease/2021/02/17/06b02195-4276-4a95-aba5-b7acd11f48c1.jpg'/>
   <div ref={ref}/>
   <ProfileName />
   {/* <Button variant='outlined' onClick={()=>navigate('/dashboard/garage/setting')}>정비소 관리</Button>  */}
   </Stack>
 </Box>

 const path = `/dashboard/profile/${nickname}`

  return (
    <>
      {isOpen && !isDesktop && <DashboardHeaderForProfile />}
         <TabProfile TABS={PROFILE_TABS} path={path} Featured={Feature} />
    </>
  );
}
