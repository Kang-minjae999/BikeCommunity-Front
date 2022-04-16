import * as React from 'react';
import {useNavigate, useParams} from 'react-router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// --------------------------------------------------------------
import { Typography, Stack } from '@mui/material';
// --------------------------------------------------------------


export default function Appmarketcategory2mobile() {
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
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} onChange={handleChange}>
      <BottomNavigationAction
        sx={{...(tab === 'biketrade') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>전체</Typography>}
        value="biketrade"
      />
      <BottomNavigationAction
        sx={{...(tab === 'biketrade-user') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>개인</Typography>}
        value="biketrade-user"
      />
      <BottomNavigationAction
        sx={{...(tab === 'biketrade-garage') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>정비소</Typography>}
        value="biketrade-garage"
      />
      <BottomNavigationAction
        sx={{...(tab === 'etctrade') && valueStyle}}
        label={<Typography variant='subtitle2'color='text.primary'>용품부품</Typography>}
        value="etctrade"
      />
      </BottomNavigation>
      </Stack> </>
</>
  );

}
