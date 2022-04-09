import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box,  Container, Typography, Card, Stack, Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CollectionsIcon from '@mui/icons-material/Collections';
// routes
import axios from '../../../../utils/axiospost';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useResponsive from '../../../../hooks/useResponsive';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

// components

import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
// sections
import {
  Profile,
  ProfileGallery,
  ProfileFollowers,
} from '../../user/profile';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------


export default function AppUserProfile() {
  const { themeStretch } = useSettings();

  const {user} = useAuth()

  const isMountedRef = useIsMountedRef();

  const navigate = useNavigate()

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const isDesktop = useResponsive('up','lg')

/* 
  useEffect(() => {  
    if(user?.nickname === undefined || user?.nickname === 'undefined'){
      navigate('/auth/login')
    }
  }, [user, navigate]) */
  

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
      component: <Profile post={post}/>,
    },
  ];

  const [heart, setHeart] = useState([])
  const [sum, setSum] = useState(0)
  
  useEffect (() => {
    if(post){
      setHeart(post.map((e)=>e.heart))
      setSum(heart.reduce((stack, el)=>{
        return stack + el;
      }, 0))
    }
 },[post])


 return (
      <>
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
                <Avatar sx={{width:40,height:40, mx:1 ,my:1}} alt='avatar' src={user?.avatar} />
                <Typography variant={isDesktop ? "h6" : 'h4'}>&nbsp;{user?.nickname}&nbsp;</Typography> 
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
                      <Typography variant="subtitle2">게시글</Typography>
                      <Typography variant="body2" >{post?.length}</Typography>
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
                    <Typography variant="body2" >{post?.length}</Typography>
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
                    <Typography variant="body2" >{sum}</Typography>
                  </Stack>
                </Box>
                </Stack>
            </Stack>
            <Image alt="profile cover" src='https://file.philgo.com/data/upload/9/2107609' ratio='16/9' /> 
            </Card>           
         {/*    ...(value === 'profile') && valueStyle */}
          <BottomNavigation showLabels sx={{ width: '100%', height:'1%' , position:'relative'}} value={value} onChange={handleChange}>
            <BottomNavigationAction
              label={<Typography variant='body2' color={value === 'gallery' ? 'text.primary' : 'disabled'} fontWeight='bold' >갤러리</Typography>}
              value="gallery"
              icon={<CollectionsIcon  width={20} height={20} color={value === 'gallery' ? 'action' : 'disabled'} />}
            />
            <BottomNavigationAction
              label={<Typography variant='body2' color={value === 'profile' ? 'text.primary' : 'disabled'} fontWeight='bold'>게시글</Typography>}
              value="profile"
              icon={<TocIcon  width={20} height={20} color={value === 'profile' ? 'action' : 'disabled'} />}
            />
            <BottomNavigationAction
              label={<Typography variant='body2' color={value === 'sell' ? 'text.primary' : 'disabled'} fontWeight='bold'>판매글</Typography>}
              value="sell"
              icon={<LocalAtmIcon width={20} height={20} color={value === 'sell' ? 'action' : 'disabled'}/>}
            />
          </BottomNavigation>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === value;
          return isMatched && <div key={tab.value} >{tab.component}</div>;
        })}
        {error && <Typography sx={{mt:10}}>{error}</Typography>}
      </>
  );
}
