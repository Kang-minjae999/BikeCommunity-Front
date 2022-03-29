import { capitalCase } from 'change-case';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Typography, Divider } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import axios from '../../utils/axiospost';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/@dashboard/user/profile';
import { SkeletonPostItem } from '../../components/skeleton';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const { user } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { id = '' } = useParams();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const isDesktop = useResponsive('up','lg')

  const [currentTab, setCurrentTab] = useState('gallery');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta/${id}`);

      if (isMountedRef.current) {
        setPost(response.data.data);
      }
    } catch (error) {
      console.error(error);
      setError('서버와의 연결이 이상해요!');
    }
  }, [isMountedRef, id]);

/*   const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta?page=${page}&size=12`);

      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef,page]); */

  
  useEffect(() => {
    getPost();
  }, [getPost]);


  const PROFILE_TABS = [
    {
      value: 'gallery',
      label: '갤러리',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileGallery gallery={_userGallery} />,
    }, 
    {
      value: 'profile',
      label: '게시글',
      icon: <TocIcon icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} />,
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
        <Box
          sx={{
            mb: 6, mt: 2,
            height: 150,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={_userAbout} />
          <Divider sx={{my:2}}/>

           <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              onChange={(e, value) => handleChangeTab(value)}
            >
               {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ))} 
            </Tabs>
          </TabsWrapperStyle> 
        </Box>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value} >{tab.component}</Box>;
        })}
        
      </Container>
    </Page>
  );
}
