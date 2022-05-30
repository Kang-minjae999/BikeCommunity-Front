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
import TabGarageProfile from '../../../../components/TabGarageProfile';
import { AppGarageCalendar } from '../../garage/calendar';

// ----------------------------------------------------------------------

export default function AppGarageProfile() {
  const { nickname } = useParams();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg')

  const ref = useRef([]);

  const PROFILE_TABS = [
    {
      index: 0,
      value: 'gallery',
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
      index: 2,
      value: 'reservation',
      label: '예약',
      component: 
      <>
       <AppGarageCalendar/>
      </>,
    },
    {
      index: 3,
      value: 'review',
      label: '리뷰',
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

  const [isOpenTab, setIsOpenTab] = useState(false)
  
  const open = () => {
    if((window.scrollY + 53) > ref?.current[0].offsetTop){
      setIsOpen(true)
    }
    if((window.scrollY + 53) < ref?.current[0].offsetTop){
      setIsOpen(false)
    }
  };

  const openTab = () => {
    if((window.scrollY + 56 ) > ref?.current[1].offsetTop){
      setIsOpenTab(true)
    }
    if((window.scrollY + 56 ) < ref?.current[1].offsetTop){
      setIsOpenTab(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', open)
    window.addEventListener('scroll', openTab)
    return () => {
      window.removeEventListener('scroll', open)
      window.removeEventListener('scroll', openTab)
    }
  }, []);

  
  useEffect(() => {
    if(isOpenTab){
      window.scrollTo(0, ref?.current[1].offsetTop - 55);
    }
  // eslint-disable-next-line
  }, [pathname]);

  
  const Feature =  
  <>     
   <Box>         
     <Stack direction='column' alignItems='center' justifyContent='center'>
     <Image ratio='1/1' alt="profile cover" 
     src='https://newsimg.hankookilbo.com/cms/articlerelease/2021/02/17/06b02195-4276-4a95-aba5-b7acd11f48c1.jpg'/>
     <div ref={el => (ref.current[0] = el)}/>
     <ProfileName />
     </Stack>
   </Box>
   <div ref={el => (ref.current[1] = el)}/>
  </>

 const path = `/dashboard/profile/${nickname}`

  return (
    <>
      {isOpen && !isDesktop && <DashboardHeaderForProfile />}
         <TabGarageProfile TABS={PROFILE_TABS} path={path} Featured={Feature} isTab={isOpenTab}/>
    </>
  );
}
