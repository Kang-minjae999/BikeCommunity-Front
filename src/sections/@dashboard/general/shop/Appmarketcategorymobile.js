import * as React from 'react';
import PropTypes from 'prop-types';
// ----------------------------------------
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// --------------------------------------------------------------
import {  Typography, Stack } from '@mui/material';


Appmarketcategorymobile.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default function Appmarketcategorymobile({value, setValue}) {

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('Market', newValue)
  };
  
  
  return (
<> 
<Stack spacing={1}>
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
          </Stack> 
      </>
  );
}
