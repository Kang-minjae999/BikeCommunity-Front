import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
// @mui
import { Box, Typography, Stack, Avatar } from '@mui/material';
// routes
import axios from '../../../../utils/axiospost';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

// components
import Image from '../../../../components/Image';
import TabProfile from '../../../../components/TabProfile';
// sections
import {
  Profile,
  ProfileGallery,
  ProfileSell,
} from '../../user/profile';

// ----------------------------------------------------------------------

export default function AppOtherProfile() {
  const { nickname } = useParams();

  const isMountedRef = useIsMountedRef();

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const isDesktop = useResponsive('up','lg')


  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta/users/${nickname}`);

      if (isMountedRef.current) {
        setPost(response.data.data.content);
      }
    } catch (error) {
      console.error(error);
      setError('서버와의 연결이 이상해요!');
    }
  }, [isMountedRef, nickname]);
  
  useEffect(() => {
    getPost();
  }, [getPost]);



  const PROFILE_TABS = [
    {
      index: 0,
      value: 'gallery',
      label: '갤러리',
      component: <ProfileGallery post={post}/>,
    }, 
    {
      index: 1,
      value: 'dingsta',
      label: '게시글',
      component: <Profile post={post}/>,
    },
    {
      index: 2,
      value: 'sell',
      label: '상품',
      component: <ProfileSell post={post}/>,
    },
  ];

  const [heart, setHeart] = useState([])
  const [sum, setSum] = useState(0)
  
  useEffect (() => {
    if(post){
      setHeart(post.map((e)=>e.heart))
      setSum(heart.reduce((stack, el)=> stack + el, 0))
    }
 },[post, heart])
 

const Feature =     
<>      
<Box sx={{mb:2}}>
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
    <Avatar sx={{width:60,height:60, mx:1 ,my:1}} alt='avatar' src={nickname} />
    <Typography variant={isDesktop ? "h6" : 'h4'}>&nbsp;{nickname}&nbsp;</Typography> 
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
</Box>
</>

const path = `/dashboard/profile/${nickname}`

 return (
   <>  
   <TabProfile TABS={PROFILE_TABS} path={path} Featured={Feature} />
  {error && <Typography>{error}</Typography>}
  </>
  );
}
