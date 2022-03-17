import * as React from 'react';
import {useEffect, useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, useParams } from 'react-router-dom';
// --------------------------------------------------------------
import { Card, Paper, Typography, Box, Stack } from '@mui/material';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
// --------------------------------------------------------------
import Apphome from '../../user/appmobile/Apphome';
import Appecommerce from '../../user/appmobile/Appecommerce';
import Appusedecommerce from '../../user/appmobile/Appusedecommerce';
import Appgarage from '../../user/appmobile/Appgarage';
import Apppost from '../../user/appmobile/Apppost'; 
import useResponsive from '../../../../hooks/useResponsive';


export default function Appmarketcategory2() {
  const { option = '' } = useParams();
  const [value, setValue] = useState(option);
  const [chvalue, setchvalue] = useState('');
  const [istrue ,setistrue] = useState(false);
  const isDesktop = useResponsive('up','lg')
  const navigate = useNavigate()

  useEffect(() => {
    if(istrue){
      setValue(chvalue)
      };
    return () => {
      setistrue(false)
    };
  }, [istrue]);


  const ACCOUNT_TABS = [
    {
      value: '바이크',
      component: <Apphome />,
    },
    {
      value: '센터매물',
      component: <Appecommerce />,
    },
    {
      value: '장비',
      component: <Appusedecommerce />,
    },
    {
      value: '부품용품',
      component: <Appgarage/>,
    },
  ];

  const handleChange = (event, newValue) => {
    setchvalue(newValue);
    setistrue(true)
    navigate(`/dashboard/marketu/${newValue}`)
  };
  
  return (
    <>
          {isDesktop && <> <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='h6'color='black' fontWeight='bold'>바이크</Typography>}
        value="바이크"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'color='black' fontWeight='bold'>센터매물</Typography>}
        value="센터매물"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'color='black' fontWeight='bold'>장비</Typography>}
        value="장비"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'color='black' fontWeight='bold'>부품용품</Typography>}
        value="부품용품"
      />
    </BottomNavigation>
{/*               {ACCOUNT_TABS.map((button) => {
                const isMatched = button.value === value;
                return isMatched && <div key={button.value}>{button.component}</div>;
              })} */}
          </Stack> </>}

          {/* 경계선 -------------------------------------------------------------------------- */}

          {!isDesktop && <> <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='black' >바이크</Typography>}
        value="바이크"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='black'>센터매물</Typography>}
        value="센터매물"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='black'>장비</Typography>}
        value="장비"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='black'>부품용품</Typography>}
        value="부품용품"
      />
         </BottomNavigation>
{/*               {ACCOUNT_TABS.map((button) => {
                const isMatched = button.value === value;
                return isMatched && <div key={button.value}>{button.component}</div>;
              })} */}
          </Stack> </>}

</>
  );

}
