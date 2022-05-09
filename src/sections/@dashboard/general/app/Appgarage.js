import * as React from 'react';
import {useEffect, useState} from 'react';
// -----------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// -----------------------------------------
import {  Typography,  Divider } from '@mui/material';
import useResponsive from '../../../../hooks/useResponsive';
import AppFeatured  from './AppFeatured';
import GaragePosts from '../../../../pages/dashboard/GaragePosts';
import GarageAsks from '../../../../pages/dashboard/GarageAsks';
import GarageMap from '../../../../pages/dashboard/GarageMap';
import GarageCards from '../../../../pages/dashboard/GarageCards';
import GarageCardsCustom from '../../../../pages/dashboard/GarageCardsCustom';


export default function Appgarage() {
  const isDesktop = useResponsive('up', 'lg')
  const [value, setValue] = useState('garage');
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

  const ACCOUNT_TABS = [
    {
      value: 'garage',
      component: <GarageCards />,
    },
    {
      value: 'custom',
      component: <GarageCardsCustom />,
    },
    {
      value: 'map',
      component: <GarageMap />,
    },
    {
      value: 'ask',
      component: <GarageAsks />,
    },
    {
      value: 'write',
      component: <GaragePosts />,
    },
  ];

  const valueStyle = {
    borderBottom:(isDesktop ? 3 : 2),
    borderBottomColor: 'text.primary',
    fontWeight:'bold'
  };
  
  const valueStyleNone = {
    borderBottom:1,
    borderBottomColor: 'disabled',
  };

  const valueStyleLeft = {
    borderTop:2,
    borderTopColor: 'text.primary',
    borderRight:1,
    borderRightColor: 'disabled',
    fontWeight:'bold'
  };

  const valueStyleMiddle = {
    borderTop:2,
    borderTopColor: 'text.primary',
    borderLeft:1,
    borderLeftColor: 'disabled',
    borderRight:1,
    borderRightColor: 'disabled',
    fontWeight:'bold'
  };

  const valueStyleRight = {
    borderTop:2,
    borderTopColor: 'text.primary',
    borderLeft:1,
    borderLeftColor: 'disabled',
    fontWeight:'bold'
  };
  

  return (
    <>
    {isDesktop && 
    <>
    <Divider sx={{ width: '90%', mt:2  }}/>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
        label={<Typography variant='body2' sx={{ ...(value === 'garage' && valueStyle)}}>정비소</Typography>}
        value="garage"
      />
     <BottomNavigationAction
        label={<Typography variant='body2' sx={{ ...(value === 'custom' && valueStyle)}}>커스텀</Typography>}
        value="custom"
      />
      <BottomNavigationAction
        label={<Typography variant='body2' sx={{ ...(value === 'map' && valueStyle)}}>위치</Typography>}
        value="map"
      />
      <BottomNavigationAction
        label={<Typography variant='body2' sx={{ ...(value === 'ask' && valueStyle)}}>정비질문</Typography>}
        value="ask"
      />
      <BottomNavigationAction
        label={<Typography variant='body2' sx={{ ...(value === 'write' && valueStyle)}}>정비글</Typography>}
        value="write"
      />
      {/* <BottomNavigationAction
        label={<Typography variant='body2' sx={{ ...(value === 'review' && valueStyle)}}>후기</Typography>}
        value="review"
      /> */}
    </BottomNavigation>
    </>}
    {!isDesktop && 
    <>
    <AppFeatured />
    <BottomNavigation showLabels sx={{ width: '100%'}} value={value} onChange={handleChange} >
      <BottomNavigationAction
        sx={{ ...(value === 'garage' ? valueStyleLeft : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={value === 'garage' ? 'text.primary' : 'inherit'} fontWeight='bold'>정비소</Typography>}
        value="garage"
      />
      <BottomNavigationAction
        sx={{ ...(value === 'custom' ? valueStyleMiddle : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={value === 'custom' ? 'text.primary' : 'inherit'} fontWeight='bold'>커스텀</Typography>}
        value="custom"
      />
      <BottomNavigationAction
        sx={{ ...(value === 'map'  ? valueStyleMiddle : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={value === 'map' ? 'text.primary' : 'inherit'} fontWeight='bold'>위치찾기</Typography>}
        value="map"
      />
      <BottomNavigationAction
        sx={{ ...(value === 'ask' ? valueStyleMiddle : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={value === 'ask' ? 'text.primary' : 'inherit'} fontWeight='bold'>정비질문</Typography>}
        value="ask"
      />
      <BottomNavigationAction
        sx={{ ...(value === 'write' ? valueStyleRight : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={value === 'write' ? 'text.primary' : 'inherit'} fontWeight='bold'>정비글</Typography>}
        value="write"
      />
      {/* <BottomNavigationAction
        sx={{ ...(value === 'review' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'record' ? 'text.primary' : 'inherit'} fontWeight='bold'>후기</Typography>}
        value="review"
        icon={<ListIcon color={value === 'review' ? 'action' : 'disabled'} />}
      /> */}
    </BottomNavigation>
    </>}
      {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
    </>
  );
}
