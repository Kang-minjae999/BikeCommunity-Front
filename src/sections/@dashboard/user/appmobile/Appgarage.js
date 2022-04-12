import * as React from 'react';
import {useEffect, useState} from 'react';
// -----------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// -----------------------------------------
import AddchartIcon from '@mui/icons-material/Addchart';
import MapIcon from '@mui/icons-material/Map';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ListIcon from '@mui/icons-material/List';
// -----------------------------------------
import { Stack, Grid, Typography,  Divider } from '@mui/material';


export default function Appgarage() {
  const [value, setValue] = useState('list');
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
      value: 'list',
      component: '',
    },
    {
      value: 'map',
      component: '',
    },
    {
      value: 'ask',
      component: '',
    },
    {
      value: 'reservation',
      component: '',
    },
    {
      value: 'review',
      component: '',
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
        sx={{ ...(value === 'list' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'list' ? 'text.primary' : 'inherit'} fontWeight='bold'>정비소</Typography>}
        value="list"
        icon={<AddchartIcon color={value === 'list' ? 'action' : 'disabled'}/>}
      />
      <BottomNavigationAction
        sx={{ ...(value === 'map' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'map' ? 'text.primary' : 'inherit'} fontWeight='bold'>위치찾기</Typography>}
        value="map"
        icon={<MapIcon color={value === 'map' ? 'action' : 'disabled'}/>}
      />
      <BottomNavigationAction
        sx={{ ...(value === 'ask' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'ask' ? 'text.primary' : 'inherit'} fontWeight='bold'>정비질문</Typography>}
        value="ask"
        icon={<HelpCenterIcon color={value === 'ask' ? 'action' : 'disabled'}/>}
      />
      <BottomNavigationAction
        sx={{ ...(value === 'reservation' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'reservation' ? 'text.primary' : 'inherit'} fontWeight='bold'>정비예약</Typography>}
        value="reservation"
        icon={<EngineeringIcon color={value === 'reservation' ? 'action' : 'disabled'}/>}
      />
      <BottomNavigationAction
        sx={{ ...(value === 'review' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'record' ? 'text.primary' : 'inherit'} fontWeight='bold'>후기</Typography>}
        value="review"
        icon={<ListIcon color={value === 'review' ? 'action' : 'disabled'} />}
      />
    </BottomNavigation>
      <Divider/>
      {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
    </>
  );
}
