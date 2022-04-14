import React, {useState} from 'react';
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
    borderBottom:2, 
    borderBottomColor:'text.primary'
  }
  return (
    <>
    <Stack spacing={1}>
      <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} onChange={handleChange}>
      <BottomNavigationAction
        sx={{...(tab === 'biketrade') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>전체</Typography>}
          value="biketrade"
        />
        <BottomNavigationAction
        sx={{...(tab === 'usermoto') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>개인</Typography>}
          value="usermoto"
        />
        <BottomNavigationAction
        sx={{...(tab === 'garagemoto') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>정비소</Typography>}
          value="garagemoto"
        />
        <BottomNavigationAction
        sx={{...(tab === 'gear') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>상세검색</Typography>}
          value="gear"
        />
      </BottomNavigation>
    </Stack> 


</>
  );

}
