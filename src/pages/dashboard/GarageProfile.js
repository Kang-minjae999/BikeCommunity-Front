import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Stack, Grid, BottomNavigation, BottomNavigationAction, Typography, Button } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CollectionsIcon from '@mui/icons-material/Collections';
import Image from '../../components/Image';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userGallery } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileAbout,
  ProfileSocialInfo,
  ProfileGallery,
  ProfileName,
  ProfileFollowers,
} from '../../sections/@dashboard/garage/profile';


// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { name = '' } = useParams();
  const navigate = useNavigate('up', 'lg')

  const [value, setValue] = useState('gallery');
  const [chvalue, setchvalue] = useState('');
  const [istrue, setistrue] = useState(false);

  const handleChange = (event, newValue) => {
    setchvalue(newValue);
    setistrue(true);
  };

  useEffect(() => {
    if (istrue) {
      setValue(chvalue);
    }
    return () => {
      setistrue(false);
    };
  }, [istrue, chvalue]);

  const PROFILE_TABS = [
    {
      value: 'gallery',
      label: '바이크',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <Typography>확인</Typography>,
    },
    {
      value: 'profile',
      label: '정비글',
      icon: <TocIcon icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <Typography>확인</Typography>,
    },
    {
      value: 'sell',
      label: '판매중',
      icon: <LocalAtmIcon icon={'eva:heart-fill'} width={20} height={20} />,
      component:  <Typography>확인</Typography>,
    },
  ];
  const valueStyle = {
    borderBottom: 2,
    borderBottomColor: 'text.primary',
  };

  return (
    <Page title="정비소">
      <Container maxWidth={themeStretch ? false : 'sm'} disableGutters>
    <Grid container spacing={1} sx={{mb:2}}>
      <Grid item xs={12} md={12}>
      <Card>         
      <Stack direction='column' alignItems='center'>
        <Image ratio='1/1' alt="profile cover" 
        src='https://mblogthumb-phinf.pstatic.net/MjAxODEwMTNfMjMz/MDAxNTM5Mzk3NDU2NDMz.oggENfLQF6TKqUCoABhUzb3z0MODnWH8LX6-rODwkeAg.6tr3s4Hqil9ObOA4Pb5H3-fDVcQehx8WyEFWGdhVZVIg.JPEG.usedcheck/fa6_53_i2.jpg?type=w800'/>
        <ProfileName />
        <Button variant='outlined' onClick={()=>navigate('/dashboard/garage/setting')}>정비소 관리</Button> 
        <BottomNavigation showLabels sx={{ width: '80%', height: '1%', mt:1, mb:1}} value={value} onChange={handleChange}>
          <BottomNavigationAction
           sx={{ ...(value === 'gallery' && valueStyle) }}
            label={
              <Typography variant="body1" color={value === 'gallery' ? 'text.primary' : 'disabled'} fontWeight="bold">
                갤러리
              </Typography>
            }
            value="gallery"
          />
          <BottomNavigationAction
           sx={{ ...(value === 'profile' && valueStyle) }}
            label={
              <Typography variant="body1" color={value === 'profile' ? 'text.primary' : 'disabled'} fontWeight="bold">
                정비글
              </Typography>
            }
            value="profile"
          />
          <BottomNavigationAction
           sx={{ ...(value === 'sell' && valueStyle) }}
            label={
              <Typography variant="body1" color={value === 'sell' ? 'text.primary' : 'disabled'} fontWeight="bold">
                판매중
              </Typography>
            }
            value="sell"
          />
          </BottomNavigation>
        </Stack>
      </Card>
      </Grid> 
      </Grid>  

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === value;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })} 
      </Container>
    </Page>
  );
}
