import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Divider, Stack, Typography } from '@mui/material';
import EcommerceCheckout from '../../../../pages/dashboard/EcommerceCheckout';
import UEcommerceHeart from '../../../../pages/dashboard/UEcommerceHeart';
import EcommerceHeart from '../../../../pages/dashboard/EcommerceHeart';
import EcommercePaymentList from '../../../../pages/dashboard/EcommercePaymentList';
import useResponsive from '../../../../hooks/useResponsive';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

export default function Aecheckouthead() {
  const isDesktop = useResponsive('up', 'lg');
  const [value, setValue] = useState('new');
  const {pathname} = useLocation()
  const isMyPage = pathname.includes('mypage')

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
    borderBottom: (isDesktop ? 3 : 2),
    borderBottomColor: 'text.primary',
    fontWeight: 'bold',
  };


  return (
    <>
        {isDesktop && (
        <>
        <HeaderBreadcrumbs
          heading="장바구니"
          links={[
            { name: '' },
          ]}
          sx={{mt:2}}
        />
        {!isMyPage && <Divider />}
        <BottomNavigation showLabels sx={{ width: '100%' }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'new' && valueStyle)}}>
                바구니
              </Typography>
            }
            value="new"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'like' && valueStyle)}}>
                신품찜
              </Typography>
            }
            value="like"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'used' && valueStyle)}}>
                중고찜
              </Typography>
            }
            value="used"
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" color="text.primary" sx={{ ...(value === 'check' && valueStyle)}}>
                결제목록
              </Typography>
            }
            value="check"
          />

        </BottomNavigation>
        <Divider />
        </>
      )}
      {!isDesktop &&
      <BottomNavigation showLabels sx={{ width: '100%', height: '1%' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
        sx={{...(value === 'new') && valueStyle}}
          label={
            <Typography variant="subtitle2" color={value === 'new' ? "text.primary" : 'disabled'}>
              바구니
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
      </BottomNavigation>}
      {ACCOUNT_TABS.map((button) => {
        const isMatched = button.value === value;
        return isMatched && <div key={button.value}>{button.component}</div>;
      })}
    </>
  );
}
