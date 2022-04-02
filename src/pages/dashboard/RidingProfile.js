import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box,  Container, Typography, Card, Stack, Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// routes
import axios from '../../utils/axiospost';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// _mock_
import { _userFollowers } from '../../_mock';
// components

import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
// sections
import {
  Profile,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/@dashboard/user/profile';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------


export default function RidingProfile() {
  const { themeStretch } = useSettings();

  const {user} = useAuth()

  const isMountedRef = useIsMountedRef();

  const navigate = useNavigate()

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const isDesktop = useResponsive('up','lg')


  useEffect(() => {  
    if(user?.nickname === undefined || user?.nickname === 'undefined'){
      navigate('/auth/login')
    }
  }, [user, navigate])
  

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta/nickname/${user?.nickname}`);

      if (isMountedRef.current) {
        setPost(response.data.data.content);
      }
    } catch (error) {
      console.error(error);
      setError('서버와의 연결이 이상해요!');
    }
  }, [isMountedRef, user]);
  
  useEffect(() => {
    getPost();
  }, [getPost]);

  const [value, setValue] = useState('gallery');
  const [chvalue, setchvalue] = useState('');
  const [istrue ,setistrue] = useState(false);

  const handleChange = (event, newValue) => {
    setchvalue(newValue);
    setistrue(true)
  };

  useEffect(() => {
    if(istrue){
      setValue(chvalue)
      };
    return () => {
      setistrue(false)
    };
  }, [istrue, chvalue]);


  const PROFILE_TABS = [
    {
      value: 'gallery',
      label: '갤러리',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileGallery post={post}/>,
    }, 
    {
      value: 'profile',
      label: '게시글',
      icon: <TocIcon icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <Profile post={post}/>,
    },
    {
      value: 'sell',
      label: '상품',
      icon: <LocalAtmIcon icon={'eva:heart-fill'} width={20} height={20} />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
  ];

  return (
      <Container maxWidth={themeStretch ? false : 'md'} sx={{mt:2}}>
          <Card >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={0}
              >
            <Box>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0}
            >
            <Avatar sx={{width:40,height:40, mx:1 ,my:1}} alt='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3aSF7SOFHZyZhHSOd9voAYmtGJdo-Yq2Vc_fzdL3CYYikNaVPkIiaOg_pEsEXzPru-U&usqp=CAU'/>
            <Typography variant={isDesktop ? "h6" : 'h4'}>&nbsp;일론머스크&nbsp;</Typography> 
            </Stack>
            </Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{mr:2}}
                >
                <Box >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                  >
                    <Typography variant="subtitle2" >게시글</Typography>
                    <Typography variant="body2" >141</Typography>
                  </Stack>
                </Box>

              <Box >
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <Typography variant="subtitle2" >판매글</Typography>
                  <Typography variant="body2" >50</Typography>
                </Stack>
              </Box>
              <Box >
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <Typography variant="subtitle2" >좋아요</Typography>
                  <Typography variant="body2" >1645</Typography>
                </Stack>
              </Box>
              </Stack>
            </Stack>
            <Image alt="profile cover" src='https://file.philgo.com/data/upload/9/2107609' ratio='16/9' />
          </Card>
            
            
          <BottomNavigation showLabels sx={{ width: '100%', height:'1%' , mt:2}} value={value} onChange={handleChange}>
            <BottomNavigationAction
              label={<Typography variant='body2' color='black' fontWeight='bold'>갤러리</Typography>}
              value="gallery"
              icon={<Iconify icon={'ic:round-perm-media'} width={20} height={20} />}
            />
            <BottomNavigationAction
              label={<Typography variant='body2' color='black' fontWeight='bold'>게시글</Typography>}
              value="profile"
              icon={<TocIcon icon={'ic:round-perm-media'} width={20} height={20} />}
            />
            <BottomNavigationAction
              label={<Typography variant='body2' color='black' fontWeight='bold'>판매글</Typography>}
              value="sell"
              icon={<LocalAtmIcon icon={'eva:heart-fill'} width={20} height={20} />}
            />
          </BottomNavigation>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === value;
          return isMatched && <Box key={tab.value} >{tab.component}</Box>;
        })}
        {error && <Typography sx={{mt:10}}>{error}</Typography>}
      </Container>
  );
}