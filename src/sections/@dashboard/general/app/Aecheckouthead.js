import * as React from 'react';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import {  Typography,  Stack, Divider,  } from '@mui/material';
import EcommerceCheckout from '../../../../pages/dashboard/EcommerceCheckout';
import UEcommerceHeart from '../../../../pages/dashboard/UEcommerceHeart';
import EcommerceHeart from '../../../../pages/dashboard/EcommerceHeart';
import EcommercePaymentList from '../../../../pages/dashboard/EcommercePaymentList';

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
      component: <UEcommerceHeart />,
    },
    {
      value: 'like',
      component: <EcommerceHeart />,
    },
    {
      value: 'check',
      component: <EcommercePaymentList />,
    },
  ];

  return (
    <Stack spacing={1}>
      <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label={
            <Typography variant="subtitle2" color="common.black">
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
