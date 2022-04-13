import React, {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate, useParams } from 'react-router-dom';
// --------------------------------------------------------------
import { Typography, Stack } from '@mui/material';
// --------------------------------------------------------------


export default function Appmarketcategory2() {
  const { option = '' } = useParams();
  const navigate = useNavigate()
  const [value, setValue] = useState()

  const handleChange = (event, newValue) => {
    navigate(`/dashboard/marketu/${newValue}`)
    setValue(newValue)
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
        sx={{...(value === 'biketrade') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>바이크</Typography>}
          value="biketrade"
        />
        <BottomNavigationAction
        sx={{...(value === 'usermoto') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>개인</Typography>}
          value="usermoto"
        />
        <BottomNavigationAction
        sx={{...(value === 'garagemoto') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>정비소</Typography>}
          value="garagemoto"
        />
        <BottomNavigationAction
        sx={{...(value === 'gear') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>장비</Typography>}
          value="gear"
        />
        <BottomNavigationAction
        sx={{...(value === 'parts') && valueStyle}}
          label={<Typography variant='h6'color='text.primary' fontWeight='bold'>부품용품</Typography>}
          value="parts"
        />
      </BottomNavigation>
    </Stack> 


</>
  );

}
