import * as React from 'react';
import EcommerceCheckout from '../../../../pages/dashboard/EcommerceCheckout';
import UEcommerceHeart from '../../../../pages/dashboard/UEcommerceHeart';
import EcommerceHeart from '../../../../pages/dashboard/EcommerceHeart';
import EcommercePaymentList from '../../../../pages/dashboard/EcommercePaymentList';
import TabHeader from '../../../../components/TabHeader';

export default function Aecheckouthead() {

  const ACCOUNT_TABS = [
    {
      index:0,
      label: '바구니',
      value: 'new',
      link: 'new',
      component: <EcommerceCheckout />,
    },
    {
      index:1,
      label: '신품찜',
      value: 'like',
      link: 'like',
      component: <EcommerceHeart />,
    },
    {
      index:2,
      label: '중고찜',
      value: 'used',
      link: 'used',
      component: <UEcommerceHeart />,
    },
    {
      index:3,
      label: '결제목록',
      value: 'check',
      link: 'check',
      component: <EcommercePaymentList />,
    },
  ];

  const path = '/dashboard/checkout'

  return (
    <>
      <TabHeader TABS={ACCOUNT_TABS} path={path}/> 
    </>
  );
}
