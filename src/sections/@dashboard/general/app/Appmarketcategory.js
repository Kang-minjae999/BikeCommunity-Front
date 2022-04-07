import * as React from 'react';
import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// ----------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// --------------------------------------------------------------
import { Typography, Stack } from '@mui/material';
// --------------------------------------------------------------


export default function Appmarketcategory() {
  const { option = '' } = useParams();
  const [value, setValue] = useState(option);
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    navigate(`/dashboard/market/${value}`)
  };

  
  return (
    <>
    <Stack spacing={1}>
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
          </Stack> </>
  );
}
