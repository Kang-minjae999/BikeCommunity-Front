import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate, useParams } from 'react-router-dom';
// --------------------------------------------------------------
import { Typography, Stack } from '@mui/material';
// --------------------------------------------------------------


export default function Appmarketcategory2() {
  const { option = '' } = useParams();
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    navigate(`/dashboard/marketu/${newValue}`)
  }
  return (
    <>
    <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='h6'color='text.primary' fontWeight='bold'>바이크</Typography>}
        value="바이크"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'color='text.primary' fontWeight='bold'>센터매물</Typography>}
        value="센터매물"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'color='text.primary' fontWeight='bold'>장비</Typography>}
        value="장비"
      />
      <BottomNavigationAction
        label={<Typography variant='h6'color='text.primary' fontWeight='bold'>부품용품</Typography>}
        value="부품용품"
      />
         </BottomNavigation>
     </Stack> 


</>
  );

}
