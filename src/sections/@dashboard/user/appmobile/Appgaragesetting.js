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
import { Typography,  Divider } from '@mui/material';


export default function Appgaragesetting() {
  const [value, setValue] = useState('profile');
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
      value: 'profile',
      component: '',
    },
    {
      value: 'chat',
      component: '',
    },
    {
      value: 'ask',
      component: '',
    },
    {
      value: 'review',
      component: '',
    },
    {
      value: 'write',
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
        sx={{ ...(value === 'profile' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'profile' ? 'text.primary' : 'inherit'} fontWeight='bold'>프로필관리</Typography>}
        value="profile"
        icon={<AddchartIcon color={value === 'profile' ? 'action' : 'disabled'}/>}
      />
      <BottomNavigationAction
        sx={{ ...(value === 'chat' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'chat' ? 'text.primary' : 'inherit'} fontWeight='bold'>채팅관리</Typography>}
        value="chat"
        icon={<MapIcon color={value === 'chat' ? 'action' : 'disabled'}/>}
      />
      <BottomNavigationAction
        sx={{ ...(value === 'ask' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'ask' ? 'text.primary' : 'inherit'} fontWeight='bold'>질문관리</Typography>}
        value="ask"
        icon={<HelpCenterIcon color={value === 'ask' ? 'action' : 'disabled'}/>}
      />
      <BottomNavigationAction
        sx={{ ...(value === 'review' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'review' ? 'text.primary' : 'inherit'} fontWeight='bold'>후기관리</Typography>}
        value="review"
        icon={<EngineeringIcon color={value === 'review' ? 'action' : 'disabled'}/>}
      />
      <BottomNavigationAction
        sx={{ ...(value === 'write' && valueStyle) }}
        label={<Typography variant='subtitle2' color={value === 'write' ? 'text.primary' : 'inherit'} fontWeight='bold'>정비글쓰기</Typography>}
        value="write"
        icon={<ListIcon color={value === 'write' ? 'action' : 'disabled'} />}
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
