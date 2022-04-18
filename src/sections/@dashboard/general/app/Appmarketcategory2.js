import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate, useParams } from 'react-router-dom';
// --------------------------------------------------------------
import { Typography, Stack } from '@mui/material';
// --------------------------------------------------------------


export default function Appmarketcategory2() {
  const { tab = '' } = useParams();
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    navigate(`/dashboard/marketu/${newValue}/0`)
  }
  const valueStyle = {
    borderBottom: 3, 
    borderBottomColor:'text.primary',
    fontWeight:'bold'
  }
  return (
    <>
    <Stack spacing={1}>
      <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} onChange={handleChange}>
      <BottomNavigationAction
          label={<Typography variant='body2' color='text.primary' sx={{...(tab === 'biketrade') && valueStyle}} >전체</Typography>}
          value="biketrade"
        />
        <BottomNavigationAction
          label={<Typography variant='body2'color='text.primary' sx={{...(tab === 'biketrade-user') && valueStyle}} >개인</Typography>}
          value="biketrade-user"
        />
        <BottomNavigationAction
          label={<Typography variant='body2'color='text.primary' sx={{...(tab === 'biketrade-garage') && valueStyle}} >정비소</Typography>}
          value="biketrade-garage"
        />
        <BottomNavigationAction
          label={<Typography variant='body2'color='text.primary' sx={{...(tab === 'etctrade') && valueStyle}} >용품부품</Typography>}
          value="etctrade"
        />
      </BottomNavigation>
    </Stack> 
</>
  );
}
