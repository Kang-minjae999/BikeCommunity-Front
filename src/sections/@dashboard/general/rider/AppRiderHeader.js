import * as React from 'react';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
import AppRidingClub from '../riding/AppRidingClub';
import TabHeader from '../../../../components/TabHeader';

export default function AppRidingHeader() {

  const path = '/dashboard/rider'

  const ACCOUNT_TABS = [
    {
      index:0,
      label: '바프',
      value: 'bikep',
      component: '',
    },
    {
      index:1,
      label: '긴급출동',
      value: 'emergency',
      component: <BlogDingstas />,
    },
    {
      index:2,
      label: '용달',
      value: 'lorry',
      component: <BlogPosts />,
    },
    {
      index:3,
      label: '사고처리',
      value: 'crash',
      component: <AppRidingClub />,
    },
    {
      index:4,
      label: '보험',
      value: 'insurance',
      component: <BlogPosts />,
    },
  ];


  return (
    <>
      <TabHeader TABS={ACCOUNT_TABS} path={path}/>
    </>
  );
}
