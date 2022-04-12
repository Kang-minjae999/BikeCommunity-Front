import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddchartIcon from '@mui/icons-material/Addchart';
import MapIcon from '@mui/icons-material/Map';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Divider, Typography } from '@mui/material';
import AppHeaderSpace from './AppHeaderSpace';


export default function AppRidingClub() {
  const [value, setValue] = useState('clublist');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
    const ACCOUNT_TABS = [
      {
        value: 'clublist',
        component: '클럽목록',
      },      
      {
        value: 'clubmap',
        component: '클럽지도',
      },
      {
        value: 'myclub',
        component: '나의클럽',
      },
      {
        value: 'newclub',
        component: '새 클럽',
      },
    ];

    const valueStyle = {
      borderBottom: 2,
      borderBottomColor: 'text.primary',
    };
  return (
    <>    
    <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
    <BottomNavigationAction
      sx={{ ...(value === 'clublist' && valueStyle) }}
      label={<Typography variant='subtitle2' color={value === 'clublist' ? 'text.primary' : 'inherit'} fontWeight='bold'>클럽목록</Typography>}
      value="clublist"
      icon={<AddchartIcon color={value === 'clublist' ? 'action' : 'disabled'}/>}
    />
    <BottomNavigationAction
      sx={{ ...(value === 'clubmap' && valueStyle) }}
      label={<Typography variant='subtitle2' color={value === 'clubmap' ? 'text.primary' : 'inherit'} fontWeight='bold'>클럽지도</Typography>}
      value="clubmap"
      icon={<MapIcon color={value === 'clubmap' ? 'action' : 'disabled'}/>}
    />
    <BottomNavigationAction
      sx={{ ...(value === 'myclub' && valueStyle) }}
      label={<Typography variant='subtitle2' color={value === 'myclub' ? 'text.primary' : 'inherit'} fontWeight='bold'>나의클럽</Typography>}
      value="myclub"
      icon={<HelpCenterIcon color={value === 'myclub' ? 'action' : 'disabled'}/>}
    />
    <BottomNavigationAction
      sx={{ ...(value === 'newclub' && valueStyle) }}
      label={<Typography variant='subtitle2' color={value === 'newclub' ? 'text.primary' : 'inherit'} fontWeight='bold'>클럽만들기</Typography>}
      value="newclub"
      icon={<EngineeringIcon color={value === 'newclub' ? 'action' : 'disabled'}/>}
    />
  </BottomNavigation>
    <Divider />
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value} >{button.component}</div>;
        })}
     </>
  );
}
