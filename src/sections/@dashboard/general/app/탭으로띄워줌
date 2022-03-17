import * as React from 'react';
import {useEffect, useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { Card, Paper, Typography, Box, Stack } from '@mui/material';
import Apphome from '../../user/appmobile/Apphome';
import Appecommerce from '../../user/appmobile/Appecommerce';
import Appusedecommerce from '../../user/appmobile/Appusedecommerce';
import Appgarage from '../../user/appmobile/Appgarage';
import Apppost from '../../user/appmobile/Apppost';
import Generalmarket from '../../../../pages/dashboard/Generalmarket';
import Generalmarketu from '../../../../pages/dashboard/Generalmarketu';


export default function Appmobilefirst() {
  const [value, setValue] = useState('home');
  const [chvalue, setchvalue] = useState('');
  const [istrue ,setistrue] = useState(false);

  const handleChange = (event, newValue) => {
    setchvalue(newValue);
    setistrue(true)
  };

  useEffect(() => {
    if(istrue){
      setValue(chvalue)
      };
    return () => {
      setistrue(false)
    };
  }, [istrue]);

  const ACCOUNT_TABS = [
    {
      value: 'home',
      component: <Apphome />,
    },
    {
      value: 'ecommerce',
      component: <Generalmarket />,
    },
    {
      value: 'usedecommerce',
      component: <Generalmarketu />,
    },
    {
      value: 'garage',
      component: <Appgarage/>,
    },
    {
      value: 'post',
      component: <Apppost/>,
    },
  ];
  
  return (
    <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='h6'>Home</Typography>}
        value="home"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'>Shop</Typography>}
        value="ecommerce"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'>Used</Typography>}
        value="usedecommerce"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'>Garage</Typography>}
        value="garage"
      />
      <BottomNavigationAction 
        label={<Typography variant='h6'>...More</Typography>}
        value="post" 
        />
    </BottomNavigation>
        {ACCOUNT_TABS.map((button) => {
          const isMatched = button.value === value;
          return isMatched && <div key={button.value}>{button.component}</div>;
        })}
     </Stack>
  );

}
