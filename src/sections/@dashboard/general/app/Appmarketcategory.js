import * as React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// ----------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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


export default function Appmarketcategory() {
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
      value: '신차',
      component: <Apphome />,
    },
    {
      value: '부품',
      component: <Appecommerce />,
    },
    {
      value: '튜닝',
      component: <Appusedecommerce />,
    },
    {
      value: '케미컬',
      component: <Appgarage/>,
    },
    {
      value: '용품',
      component: <Apppost/>,
    },    
    {
      value: '헬멧',
      component: <Apphome />,
    },
    {
      value: '자켓',
      component: <Appecommerce />,
    },
    {
      value: '바지',
      component: <Appusedecommerce />,
    },
    {
      value: '장갑',
      component: <Appgarage/>,
    },
    {
      value: '부츠',
      component: <Apppost/>,
    },
    {
      value: '슈트',
      component: <Apphome />,
    },
    {
      value: '보호대',
      component: <Appecommerce />,
    },
    {
      value: '마스크',
      component: <Appusedecommerce />,
    },
    {
      value: '가방',
      component: <Appgarage/>,
    },
    {
      value: '블루투스',
      component: <Apppost/>,
    },    
    {
      value: '블랙박스',
      component: <Apphome />,
    },
    {
      value: '거치대',
      component: <Appecommerce />,
    },
    {
      value: '리어백',
      component: <Appusedecommerce />,
    },
    {
      value: '우의',
      component: <Appgarage/>,
    },
    {
      value: '악세사리',
      component: <Apppost/>,
    },
  ];
  const handleChange = (event, newValue) => {
    setchvalue(newValue);
    setistrue(true)
    navigate(`/dashboard/market/${newValue}`)
  };

  
  return (
    <>
          {isDesktop && <> <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>신차</Typography>}
        value="신차"
      />
      <BottomNavigationAction
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>부품</Typography>}
        value="부품"
      />
      <BottomNavigationAction
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>튜닝</Typography>}
        value="튜닝"
      />
      <BottomNavigationAction
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>케미컬</Typography>}
        value="케미컬"
      />
      <BottomNavigationAction 
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>용품</Typography>}
        value="용품" 
        />
     <BottomNavigationAction
        label={<><Typography variant='h6' color='text.primary' fontWeight='bold'>헬멧</Typography></>}
        value="헬멧"
      />
      <BottomNavigationAction
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>자켓</Typography>}
        value="자켓"
      />
      <BottomNavigationAction
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>바지</Typography>}
        value="바지"
      />
      <BottomNavigationAction
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>장갑</Typography>}
        value="장갑"
      />
      <BottomNavigationAction 
        label={<Typography variant='h6' color='text.primary' fontWeight='bold'>부츠</Typography>}
        value="부츠" 
        />
    </BottomNavigation>
     </Stack>

         <Stack spacing={1}>
         <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
           <BottomNavigationAction
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>슈트</Typography>}
             value="슈트"
           />
           <BottomNavigationAction
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>보호대</Typography>}
             value="보호대"
           />
           <BottomNavigationAction
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>마스크</Typography>}
             value="마스크"
           />
           <BottomNavigationAction
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>가방</Typography>}
             value="가방"
           />
           <BottomNavigationAction 
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>블루투스</Typography>}
             value="블루투스" 
             />
            <BottomNavigationAction
             label={<> <Typography variant='h6' color='text.primary' fontWeight='bold'>블랙박스</Typography></>}
             value="블랙박스"
           />
           <BottomNavigationAction
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>거치대</Typography>}
             value="거치대"
           />
           <BottomNavigationAction
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>리어백</Typography>}
             value="리어백"
           />
           <BottomNavigationAction
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>우의</Typography>}
             value="우의"
           />
           <BottomNavigationAction 
             label={<Typography variant='h6' color='text.primary' fontWeight='bold'>악세사리</Typography>}
             value="악세사리" 
             />
         </BottomNavigation>
          </Stack> </>}


          {/* 경계선 -------------------------------------------------------------------------- */}
          {!isDesktop && <> <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='subtitle2' color='text.primary'>신차</Typography>}
        value="신차"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>부품</Typography>}
        value="부품"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>튜닝</Typography>}
        value="튜닝"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>케미컬</Typography>}
        value="케미컬"
      />
      <BottomNavigationAction 
        label={<Typography variant='subtitle2'color='text.primary'>용품</Typography>}
        value="용품" 
        />
        </BottomNavigation>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
     <BottomNavigationAction
        label={<><Typography variant='subtitle2'color='text.primary'>헬멧</Typography></>}
        value="헬멧"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>자켓</Typography>}
        value="자켓"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>바지</Typography>}
        value="바지"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>장갑</Typography>}
        value="장갑"
      />
      <BottomNavigationAction 
        label={<Typography variant='subtitle2'color='text.primary'>부츠</Typography>}
        value="부츠" 
        />
    </BottomNavigation> 
         <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
           <BottomNavigationAction
             label={<Typography variant='subtitle2'color='text.primary'>슈트</Typography>}
             value="슈트"
           />
           <BottomNavigationAction
             label={<Typography variant='subtitle2'color='text.primary'>보호대</Typography>}
             value="보호대"
           />
           <BottomNavigationAction
             label={<Typography variant='subtitle2'color='text.primary'>마스크</Typography>}
             value="마스크"
           />
           <BottomNavigationAction
             label={<Typography variant='subtitle2'color='text.primary'>가방</Typography>}
             value="가방"
           />
           <BottomNavigationAction 
             label={<Typography variant='subtitle2'color='text.primary'>블루투스</Typography>}
             value="블루투스" 
             />
         </BottomNavigation>
        <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
             label={<> <Typography variant='subtitle2'color='text.primary'>블랙박스</Typography></>}
             value="블랙박스"
           />
           <BottomNavigationAction
             label={<Typography variant='subtitle2'color='text.primary'>거치대</Typography>}
             value="거치대"
           />
           <BottomNavigationAction
             label={<Typography variant='subtitle2'color='text.primary'>리어백</Typography>}
             value="리어백"
           />
           <BottomNavigationAction
             label={<Typography variant='subtitle2'color='text.primary'>우의</Typography>}
             value="우의"
           />
           <BottomNavigationAction 
             label={<Typography variant='subtitle2'color='text.primary'>악세사리</Typography>}
             value="악세사리" 
             />
         </BottomNavigation>
          </Stack> </>}

</>
  );

}
