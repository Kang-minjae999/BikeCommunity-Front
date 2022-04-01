import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Tabs, Container, Typography, Divider, Card, Stack, TextField, InputAdornment, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/@dashboard/user/profile';
import { AppWelcomefirst } from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const navigate = useNavigate()

  const { nickname = '' } = useParams();

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const isDesktop = useResponsive('up','lg')

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {  
    if(nickname === undefined || nickname === 'undefined'){
      navigate('/auth/login')
    }
  }, [nickname])
  

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta/nickname/${nickname}`);

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
    <Page title="프로필">
      <Container maxWidth={themeStretch ? false : 'md'} sx={{mt:2}}>
        {isDesktop && <HeaderBreadcrumbs
          heading="프로필"
          links={[
            { name: '' },
          ]}
        />} 
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
          <Card sx={{width:'100%', height:300}}>
          <ProfileCover nickname={nickname} />
          <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              onChange={(e, value) => handleChangeTab(value)}
              sx={{bottom:0}}
            >
               {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ))} 
          </Tabs>
          </Card>
          </Stack>
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value} >{tab.component}</Box>;
        })}
        {error && <Typography sx={{mt:10}}>{error}</Typography>}
      </Container>
    </Page>
  );
}
