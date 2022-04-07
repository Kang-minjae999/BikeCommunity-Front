import PropTypes from 'prop-types';
import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// --------------------------------------------------------------
import { Typography, Stack } from '@mui/material';
// --------------------------------------------------------------

Appmarketcategory2mobile.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default function Appmarketcategory2mobile({value, setValue}) {

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('uMarket', newValue)
  };
  
  return (
    <>
      <> <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary' >바이크</Typography>}
        value="biketrade"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>센터매물</Typography>}
        value="garagebiketrade"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>장비</Typography>}
        value="gear"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>부품용품</Typography>}
        value="parts"
      />
         </BottomNavigation>
        </Stack> </>

</>
  );

}
