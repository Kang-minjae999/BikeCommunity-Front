import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EcommerceCheckout from '../../../../pages/dashboard/EcommerceCheckout';
import UEcommerceHeart from '../../../../pages/dashboard/UEcommerceHeart';
import EcommerceHeart from '../../../../pages/dashboard/EcommerceHeart';
import EcommercePaymentList from '../../../../pages/dashboard/EcommercePaymentList';
import TabHeader from '../../../../components/TabHeader';

export default function Aecheckouthead() {
  const {value} = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    if(!value){
      navigate(`/dashboard/checkout/new`);
    }
  })
  


  const ACCOUNT_TABS = [
    {
      index:0,
      label: '바구니',
      value: 'new',
      component: <EcommerceCheckout />,
    },
    {
      index:1,
      label: '신품찜',
      value: 'like',
      component: <EcommerceHeart />,
    },
    {
      index:2,
      label: '중고찜',
      value: 'used',
      component: <UEcommerceHeart />,
    },
    {
      index:3,
      label: '결제목록',
      value: 'check',
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
