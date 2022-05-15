import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import BlogDingstas from '../../../../pages/dashboard/BlogDingstas';
import BlogPosts from '../../../../pages/dashboard/BlogPosts';
import GarageCardsClean from '../../../../pages/dashboard/GarageCardsClean';
import TabHeader from '../../../../components/TabHeader';

export default function AppRidingHeader() {
  const { value } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if(!value){
      navigate('/dashboard/motocycle/rent')
    }
  }, [value, navigate])

  const path = '/dashboard/motocycle'

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
  ];


  return (
    <>
      <TabHeader TABS={ACCOUNT_TABS} path={path}/>
    </>
  );
}
