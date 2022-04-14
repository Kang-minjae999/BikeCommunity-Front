import PropTypes from 'prop-types';
import * as React from 'react';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router';
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
  const { tab = '' } = useParams();
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    navigate(`/dashboard/shop/used/${newValue}/0`)
  }
  const valueStyle = {
    borderBottom:2, 
    borderBottomColor:'text.primary'
  }

  return (
    <>
      <> <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        sx={{...(tab === 'biketrade') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>바이크</Typography>}
        value="biketrade"
      />
      <BottomNavigationAction
        sx={{...(tab === 'userbiketrade') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>개인</Typography>}
        value="userbiketrade"
      />
      <BottomNavigationAction
        sx={{...(tab === 'garagebiketrade') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>정비소</Typography>}
        value="garagebiketrade"
      />
      <BottomNavigationAction
        sx={{...(tab === 'gear') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>장비</Typography>}
        value="gear"
      />
      <BottomNavigationAction
        sx={{...(tab === 'parts') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>부품용품</Typography>}
        value="parts"
      />
         </BottomNavigation>
      </Stack> </>
</>
  );

}
