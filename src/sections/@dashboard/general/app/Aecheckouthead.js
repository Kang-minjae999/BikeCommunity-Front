import * as React from 'react';
import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography } from '@mui/material';
import EcommerceCheckout from '../../../../pages/dashboard/EcommerceCheckout';
import UEcommerceHeart from '../../../../pages/dashboard/UEcommerceHeart';
import EcommerceHeart from '../../../../pages/dashboard/EcommerceHeart';
import EcommercePaymentList from '../../../../pages/dashboard/EcommercePaymentList';

export default function Aecheckouthead() {
  const [value, setValue] = useState('new');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ACCOUNT_TABS = [
    {
      value: 'new',
      component: <EcommerceCheckout />,
    },
    {
      value: 'like',
      component: <EcommerceHeart />,
    },
    {
      value: 'used',
      component: <UEcommerceHeart />,
    },
    {
      value: 'check',
      component: <EcommercePaymentList />,
    },
  ];
  const valueStyle = {
    borderBottom:2, 
    borderBottomColor:'text.primary'
  }
  return (
    <>
      <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
        sx={{...(value === 'new') && valueStyle}}
          label={
            <Typography variant="subtitle2" color={value === 'new' ? "text.primary" : 'disabled'}>
              신품
            </Typography>
          }
          value="new"
        />
        <BottomNavigationAction
        sx={{...(value === 'like') && valueStyle}}
          label={
            <Typography variant="subtitle2" color={value === 'like' ? "text.primary" : 'disabled'}>
              신품찜
            </Typography>
          }
          value="like"
        />
        <BottomNavigationAction
        sx={{...(value === 'used') && valueStyle}}
          label={
            <Typography variant="subtitle2" color={value === 'used' ? "text.primary" : 'disabled'}>
              중고찜
            </Typography>
          }
          value="used"
        />
        <BottomNavigationAction
        sx={{...(value === 'check') && valueStyle}}
          label={
            <Typography variant="subtitle2" color={value === 'check' ? "text.primary" : 'disabled'}>
              결제목록
            </Typography>
          }
          value="check"
        />
      </BottomNavigation>
      {ACCOUNT_TABS.map((button) => {
        const isMatched = button.value === value;
        return isMatched && <div key={button.value}>{button.component}</div>;
      })}
    </>
  );
}
