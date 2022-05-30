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
} from '../../club/profile';
import useResponsive from '../../../../hooks/useResponsive';
import TabClub from '../../../../components/TabClub';


// ----------------------------------------------------------------------

export default function AppClubProfile() {
  const { nickname } = useParams();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const ref = useRef([]);

  const [isopen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);


  const PROFILE_TABS = [
    {
      index: 0,
      value: 'info',
      label: '정보',
      component: 
      <>
      <Typography variant="body1">
        안녕하세요! <br/>
        저희는 라이더타운 노조입니다. <br/>
        많은 관심 부탁드립니다. <br/>
        줄여서 많관부 ^^
      </Typography> 
      아래에 가입조건
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
      value: 'board',
      label: '게시판',
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
      value: 'gallery',
      label: '갤러리',
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
      index: 3,
      value: 'chat',
      label: '채팅',
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
    if((window.scrollY + 103) > ref?.current[0].offsetTop){
      setIsOpen(true)
    }
    if((window.scrollY + 103) < ref?.current[0].offsetTop){
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
    } else {
      window.scrollTo(0, window.scrollY)
    }
  // eslint-disable-next-line
  }, [pathname]);
  
 const Feature =  
 <>     
  <Box sx={{mb:3}}>         
    <Stack direction='column' alignItems='center' justifyContent='center'>
    <Image ratio='1/1' alt="profile cover" 
    src='https://newsimg.hankookilbo.com/cms/articlerelease/2021/02/17/06b02195-4276-4a95-aba5-b7acd11f48c1.jpg'/>
    <div ref={el => (ref.current[0] = el)}/>
    <ProfileName open={isopen} setOpen={setOpen} handleOpen={handleOpen} />
    </Stack>
  </Box>
  <div ref={el => (ref.current[1] = el)}/>
 </>
 const path = `/dashboard/club/room/${nickname}`

  return (
    <>
      {isOpen && !isDesktop && <DashboardHeaderForProfile handleOpen={handleOpen}/>}
         <TabClub TABS={PROFILE_TABS} path={path} Featured={Feature} isTab={isOpenTab}/>
    </>
  );
};
