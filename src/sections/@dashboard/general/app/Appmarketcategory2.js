import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate, useParams } from 'react-router-dom';
// --------------------------------------------------------------
import { Typography, Stack } from '@mui/material';
// --------------------------------------------------------------
import useResponsive from '../../../../hooks/useResponsive';


export default function Appmarketcategory2() {
  const { option = '' } = useParams();
  const [value, setValue] = useState(option);
  const [chvalue, setchvalue] = useState('');
  const isDesktop = useResponsive('up','lg')
  const navigate = useNavigate()


  const handleChange = (event, newValue) => {
    setchvalue(newValue);
    navigate(`/dashboard/marketu/${newValue}`)
  };
  
  return (
    <>
          {isDesktop && <> <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
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
          </Stack> </>}

          {!isDesktop && <> <Stack spacing={1}>
    <BottomNavigation showLabels sx={{ width: '100%', height:'1%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary' >바이크</Typography>}
        value="바이크"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>센터매물</Typography>}
        value="센터매물"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>장비</Typography>}
        value="장비"
      />
      <BottomNavigationAction
        label={<Typography variant='subtitle2'color='text.primary'>부품용품</Typography>}
        value="부품용품"
      />
         </BottomNavigation>

          </Stack> </>}

</>
  );

}
