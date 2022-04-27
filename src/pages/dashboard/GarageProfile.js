import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, Grid, BottomNavigation, BottomNavigationAction, Typography } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Image from '../../components/Image';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
import DashboardHeaderForProfile from '../../layouts/dashboard/header/indexForProfile';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import {
  ProfileName,
} from '../../sections/@dashboard/garage/profile';
import useResponsive from '../../hooks/useResponsive';


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
  const isDesktop = useResponsive('up', 'lg')
  const { user } = useAuth();
  const { name = '' } = useParams();
  const navigate = useNavigate()

  const ref = useRef()

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
      value: 'profile',
      label: '정비글',
      icon: <TocIcon icon={'ic:round-perm-media'} width={20} height={20} />,
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
      value: 'sell',
      label: '판매중',
      icon: <LocalAtmIcon icon={'eva:heart-fill'} width={20} height={20} />,
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
  const valueStyle = {
    borderBottom: 2,
    borderBottomColor: 'text.primary',
  };

  const valueStyleLeft = {
    borderTop:(isDesktop ? 3 : 2), 
    borderRight:(isDesktop ? 2 : 1),
    borderTopColor:'text.primary',
    borderRightColor:'text.disabled',
    fontWeight:'bold',
  }
  
  
  const valueStyleMiddle = {
    borderTop:(isDesktop ? 3 : 2), 
    borderRight:(isDesktop ? 2 : 1),
    borderTopColor:'text.primary',
    borderRightColor:'text.disabled',
    borderLeft:(isDesktop ? 2 : 1),
    borderLeftColor:'text.disabled',
    fontWeight:'bold',
  }
  
  const valueStyleRight = {
    borderLeft:(isDesktop ? 2 : 1),
    borderLeftColor:'text.disabled',
    borderTop:(isDesktop ? 3 : 2), 
    borderTopColor:'text.primary',
    fontWeight:'bold',
  }
 
  const valueStyleNo = {
    borderBottom:(isDesktop ? 2 : 1), 
    borderBottomColor:'text.disabled',
  }

  const [isOpen, setIsOpen] = useState(false)
  
  const open = () => {
    if(window.scrollY + 53 > ref?.current.offsetTop){
      setIsOpen(true)
    }
    if(window.scrollY + 53 < ref?.current.offsetTop){
      setIsOpen(false)
    }
  }
  console.log(ref)
  useEffect(() => {
    window.addEventListener('scroll', open)
    return () => {
      window.removeEventListener('scroll', open)
    }
  }, [])
  

  return (
    <Page title="정비소">
      {isOpen && !isDesktop && <DashboardHeaderForProfile />}
      <Container maxWidth={themeStretch ? false : 'md'} disableGutters sx={{mb:5}}>
      <Grid container spacing={1} sx={{mb:2}}>
      <Grid item xs={12} md={12}>
      <Box>         
      <Stack direction='column' alignItems='center' justifyContent='center'>
        <Image ratio='1/1' alt="profile cover" 
        src='https://newsimg.hankookilbo.com/cms/articlerelease/2021/02/17/06b02195-4276-4a95-aba5-b7acd11f48c1.jpg'/>
        <div ref={ref}/>
        <ProfileName />
        {/* <Button variant='outlined' onClick={()=>navigate('/dashboard/garage/setting')}>정비소 관리</Button>  */}
        </Stack>
        <BottomNavigation showLabels sx={{ width: '100%', height: '1%', mt:3, mb:1}} value={value} onChange={handleChange} >
          <BottomNavigationAction
              sx={{...(value === 'gallery') ? valueStyleLeft : valueStyleNo}}
            label={
              <Typography variant="body1" color={value === 'gallery' ? 'text.primary' : 'disabled'} fontWeight="bold">
                갤러리
              </Typography>
            }
            value="gallery"
          />
          <BottomNavigationAction
              sx={{...(value === 'profile') ? valueStyleMiddle : valueStyleNo}}
            label={
              <Typography variant="body1" color={value === 'profile' ? 'text.primary' : 'disabled'} fontWeight="bold">
                정비글
              </Typography>
            }
            value="profile"
          />
          <BottomNavigationAction
              sx={{...(value === 'sell') ? valueStyleRight : valueStyleNo}}
            label={
              <Typography variant="body1" color={value === 'sell' ? 'text.primary' : 'disabled'} fontWeight="bold">
                판매중
              </Typography>
            }
            value="sell"
          />
          </BottomNavigation> 
      </Box>
      </Grid> 
      </Grid> 

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === value;
          return isMatched && <div key={tab.value}>{tab.component}</div>;
        })} 
      </Container>
    </Page>
  );
}
