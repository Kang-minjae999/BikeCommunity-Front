import * as React from 'react';
import { AppUserMoto,  AppUserProfile, AppUserClub } from '.';
import UserAccount from '../../../../pages/dashboard/UserAccount';
import TabHeader from '../../../../components/TabHeader';

export default function AppUserHeader() {

  const path = '/dashboard/mypage'

  const ACCOUNT_TABS = [
    {
      index: 0,
      label: '프로필',
      value: 'prof',
      link: 'prof/gallery',
      component: <AppUserProfile />,
    },
    {
      index:1,
      label: '클럽',
      value: 'club',
      link: 'club',
      component: <AppUserClub/>,
    },
    {
      index:2,
      label: '바이크',
      value: 'moto',
      link: 'moto',
      component: <AppUserMoto />,
    },
    {
      index:3,
      label: '설정',
      value: 'setting',
      link: 'setting/prof',
      component: <UserAccount/>,
    },
  ];

  return (
    <>
      <TabHeader TABS={ACCOUNT_TABS} path={path}/>
    </>
  );
}
