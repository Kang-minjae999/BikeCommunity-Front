import * as React from 'react';
import AppRidingHome from './AppRidingHome';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
import AppRidingClub from './AppRidingClub';
import GarageCardsCafe from '../../../../pages/dashboard/GarageCardsCafe';
import TabHeader from '../../../../components/TabHeader';

export default function AppRidingHeader() {
  const path = '/dashboard/riding'

  const ACCOUNT_TABS = [
    {
      index:0,
      label: '지도',
      value: 'map',
      link: 'map/ridingmap',
      component: null,
      Feature:  <AppRidingHome/>,
    },
    {
      index:1,
      label: '딩스타',
      value: 'dingsta',
      link: 'dingsta',
      component: <BlogDingstas />,
    },
    {
      index:2,
      label: '포스트',
      value: 'post',
      link: 'post',
      component: <BlogPosts />,
    },
    {
      index:3,
      label: '클럽',
      value: 'club',
      link: 'club/dingsta',
      component: null,
      Feature: <AppRidingClub />,
    },
    {
      index:4,
      label: 'CAFE',
      value: 'cafe',
      link: 'cafe',
      component: <GarageCardsCafe />
    },
  ];


  return (
    <>
      <TabHeader TABS={ACCOUNT_TABS} path={path}/>
    </>
  );
}
