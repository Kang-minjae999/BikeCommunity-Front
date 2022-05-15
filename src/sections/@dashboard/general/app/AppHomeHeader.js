import * as React from 'react';
import { AppHomeMain ,AppHomeBest, AppHomeBrand, AppHomeMagazine } from '.';
import GeneralMarketu from '../../../../pages/dashboard/GeneralMarketu';
import TabHeader from '../../../../components/TabHeader';
import AppFeatured from './AppFeatured';

export default function AppHomeHeader() {

  const APP_TABS = [
    {
      index:0,
      value: 'home',
      label: 'RT',
      component: <AppHomeMain />,
      Feature : <AppFeatured />,
    },
    {
      index:1,
      value: 'brand',
      label: 'BRAND',
      component: <AppHomeBest />,
    },
    {
      index:2,
      value: 'category',
      label: '카테고리',
      component: <AppHomeBrand />,
    },
    {
      index:3,
      value: 'genre',
      label: '장르',
      component: <AppHomeMagazine/>,
    },
    {
      index:4,
      value: 'used',
      label: '중고',
      component: <GeneralMarketu />,
    },
  ];

  const path = '/dashboard/app'

  return (
     <>
      <TabHeader TABS={APP_TABS} path={path} />
     </>
  );
}
