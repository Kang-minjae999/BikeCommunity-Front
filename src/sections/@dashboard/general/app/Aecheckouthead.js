import * as React from 'react';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { Card, Paper, Typography, Box, Stack, Divider, CardHeader } from '@mui/material';
import Apphome from '../../user/appmobile/Apphome';
import Appecommerce from '../../user/appmobile/Appecommerce';
import Appusedecommerce from '../../user/appmobile/Appusedecommerce';
import Appgarage from '../../user/appmobile/Appgarage';
import Apppost from '../../user/appmobile/Apppost';
import Generalmarket from '../../../../pages/dashboard/Generalmarket';
import Generalmarketu from '../../../../pages/dashboard/Generalmarketu';
import EcommerceCheckout from '../../../../pages/dashboard/EcommerceCheckout';
import UEcommerceCheckout from '../../../../pages/dashboard/UEcommerceCheckout';

export default function Aecheckouthead() {
  const [value, setValue] = useState('new');
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
  }, [istrue]);

  const ACCOUNT_TABS = [
    {
      value: 'new',
      component: <EcommerceCheckout />,
    },
    {
      value: 'used',
      component: <UEcommerceCheckout />,
    },
    {
      value: 'like',
      component: <Generalmarketu />,
    },
    {
      value: 'check',
      component: <Appgarage />,
    },
  ];

  return (
    <Stack spacing={1}>
      <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label={
            <Typography variant="subtitle2" color="black">
              신품
            </Typography>
          }
          value="new"
        />
        <BottomNavigationAction
          label={
            <Typography variant="subtitle2" color="black">
              중고
            </Typography>
          }
          value="used"
        />
        <BottomNavigationAction
          label={
            <Typography variant="subtitle2" color="black">
              찜
            </Typography>
          }
          value="like"
        />
        <BottomNavigationAction
          label={
            <Typography variant="subtitle2" color="black">
              결제
            </Typography>
          }
          value="check"
        />
      </BottomNavigation>
      <Divider />
      {ACCOUNT_TABS.map((button) => {
        const isMatched = button.value === value;
        return isMatched && <div key={button.value}>{button.component}</div>;
      })}
    </Stack>
  );
}
