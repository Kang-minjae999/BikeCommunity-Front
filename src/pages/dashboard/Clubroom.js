import { useState, useEffect } from 'react';
// @mui
import { Container, Tab, Box, Tabs, Grid, Typography, BottomNavigationAction, BottomNavigation, Card, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeIcon from '@mui/icons-material/Home';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import StoreIcon from '@mui/icons-material/Store';

import { getProduct } from '../../redux/slices/product';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import Clubroomhome from './Clubroomhome';
import useAuth from '../../hooks/useAuth';
import Clubboard from './Clubboard';
import Clubchat from './Clubchat';
import Clubcalender from './Clubcalender';
import ProfileCover from '../../sections/@dashboard/club/Clubprofile';
import useResponsive from '../../hooks/useResponsive';
// ----------------------------------------------------------------------

export default function Clubroom() {
  const { user } = useAuth();
  const isDesktop = useResponsive('up','lg')
  const { themeStretch } = useSettings();
  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { id = '' } = useParams();

  
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

 // ----------------------------------------------------
 const [value, setValue] = useState('');
 const [valuetrue, setvaluetrue] = useState(false);
 const handleChange = (event, newValue) => {
   setValue(newValue);
   setvaluetrue(true);
 };

 useEffect(() => {
   if(valuetrue === true )
   {
    setCurrentTab(value)
   } 
   return () => {
     setvaluetrue(false)
     setTimeout(() => {setValue('')}, 100);
       };
   }, [value]); 
   // -----------------------------------------------------

  const [currentTab, setCurrentTab] = useState('Home');

  const ACCOUNT_TABS = [
    {
      value: 'Home',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Clubroomhome/>,
    },    {
      value: 'Board',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Clubboard />,
    },
    {
      value: 'Calender',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <Clubcalender />,
    },
    {
      value: 'Chat',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <Clubchat />,
    },
  ];

  return (
    <Page title="프로필">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {isDesktop && 
        <Card
          sx={{
            mb: 2, mt: 2,
            height: '70vh' ,
            position: 'relative',
          }}
        >
        {product && 
          <ProfileCover product={product}/>} 
        </Card>}
        {!isDesktop && 
        <Card
          sx={{
            mb: 2, mt: 2,
            height: '30vh' ,
            position: 'relative',
          }}
        >
        {product && 
          <ProfileCover product={product}/>} 
        </Card>}
        <BottomNavigation showLabels sx={{ width: '100%' ,height:'1%', mb:2}} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label={<Typography variant='body2' color='black'>클럽 홈</Typography>}
            value="Home"
            icon={<HomeIcon color='primary' />}
          />
          <BottomNavigationAction
            label={<Typography variant='body2' color='black'>게시판</Typography>}
            value="Board"
            icon={<StoreIcon  color='primary'/>}
          />
          <BottomNavigationAction
            label={<Typography variant='body2' color='black'>캘린더</Typography>}
            value="Calender"
            icon={<TwoWheelerIcon color='primary'/>}
          />
          <BottomNavigationAction
            label={<Typography variant='body2' color='black'>채팅</Typography>}
            value="Chat"
            icon={<PhotoFilterIcon color='primary' />}
          />
        </BottomNavigation>
        <Divider />
        <Box sx={{ mb: 2 }} />
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
