import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import AppFeatured  from './AppFeatured';
import GaragePosts from '../../../../pages/dashboard/GaragePosts';
import GarageAsks from '../../../../pages/dashboard/GarageAsks';
import GarageMap from '../../../../pages/dashboard/GarageMap';
import GarageCards from '../../../../pages/dashboard/GarageCards';
import GarageCardsCustom from '../../../../pages/dashboard/GarageCardsCustom';
import TabMiddle from '../../../../components/TabMiddle';


export default function Appgarage() {
  const navigate = useNavigate()
  
  const {value} = useParams()

  const { pathname } = useLocation();

  const ref = useRef()

  const [isOpen, setIsOpen] = useState(false)
  
  const open = () => {
    if(window.scrollY + 53 > ref?.current.offsetTop){
      setIsOpen(true)
    }
    if(window.scrollY + 53 < ref?.current.offsetTop){
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', open)
    return () => {
      window.removeEventListener('scroll', open)
    }
  }, [])

  useEffect(() => {
    if(!isOpen){
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, ref?.current.offsetTop - 53);
    }
  // eslint-disable-next-line
  }, [pathname]);


  useEffect(() => {
    if(!value){
        navigate(`/dashboard/garages/garage`);
    }
  } , [value ,navigate])

  const path = '/dashboard/garages'

  const Featured =  <><AppFeatured /><div ref={ref}/></>

  const ACCOUNT_TABS = [
    {
      index: 0,
      label: '정비소',
      value: 'garage',
      component: <GarageCards />,
    },
    {
      index: 1,
      label: '커스텀',
      value: 'custom',
      component: <GarageCardsCustom />,
    },
    {
      index: 2,
      label: '위치',
      value: 'map',
      component: <GarageMap />,
    },
    {
      index: 3,
      label: '정비질문',
      value: 'ask',
      component: <GarageAsks />,
    },
    {
      index: 4,
      label: '정비글',
      value: 'posts',
      component: <GaragePosts />,
    },
  ];

  

  return (
    <>
      <TabMiddle TABS={ACCOUNT_TABS} path={path} Featured={Featured} />
    </>
  );
}
