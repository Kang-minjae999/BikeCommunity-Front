import * as React from 'react';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
import GarageCardsClean from '../../../../pages/dashboard/GarageCardsClean';
import TabLongHeader from '../../../../components/TabLongHeader';
import { AppRidingClub } from '../riding';

export default function AppRiderHeader() {
  const path = '/dashboard/rider'

  const ACCOUNT_TABS = [
    {
      index:0,
      label: '렌트',
      value: 'rent',
      component: <BlogDingstas />,
    },
    {
      index:1,
      label: '리스',
      value: 'lease',
      component: '하위',
    },
    {
      index:2,
      label: '교육',
      value: 'edu',
      component: <BlogPosts />,
    },
    {
      index:3,
      label: '세차',
      value: 'clean',
      component: <GarageCardsClean />,
    },
    {
      index:4,
      label: '환경검사',
      value: 'test',
      component: <BlogPosts />,
    },
    {
      index:5,
      label: '바프',
      value: 'bikep',
      component: '',
    },
    {
      index:6,
      label: '긴급출동',
      value: 'emergency',
      component: <BlogDingstas />,
    },
    {
      index:7,
      label: '용달',
      value: 'lorry',
      component: <BlogPosts />,
    },
    {
      index:8,
      label: '사고처리',
      value: 'crash',
      component: <AppRidingClub />,
    },
    {
      index:9,
      label: '보험',
      value: 'insurance',
      component: <BlogPosts />,
    },
  ];


  return (
    <>
      <TabLongHeader TABS={ACCOUNT_TABS} path={path}/>
    </>
  );
}
