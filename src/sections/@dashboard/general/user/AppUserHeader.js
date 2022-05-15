import * as React from 'react';
import { AppUserMoto,  AppUserProfile, AppUserClub } from '.';
import UserAccount from '../../../../pages/dashboard/UserAccount';
import AppUserCheckout from './AppUserCheckout';
import TabHeader from '../../../../components/TabHeader';

export default function AppUserHeader() {

  const path = '/dashboard/mypage'

  const ACCOUNT_TABS = [
    {
      index:0,
      label: '프로필',
      value: 'prof',
      component: <AppUserProfile />,
    },
    {
      index:1,
      label: '장바구니',
      value: 'check',
      component: <AppUserCheckout />,
    },
    {
      index:2,
      label: '바이크',
      value: 'moto',
      component: <AppUserMoto />,
    },
    {
      index:3,
      label: '클럽',
      value: 'club',
      component: <AppUserClub/>,
    },
    {
      index:4,
      label: '설정',
      value: 'setting',
      component: <UserAccount/>,
    },
  ];

  return (
    <>
      <TabHeader TABS={ACCOUNT_TABS} path={path}/>
    </>
  );
}
