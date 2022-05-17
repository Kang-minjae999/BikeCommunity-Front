import * as React from 'react';
import { Divider } from '@mui/material';
import AppHomeSaleFeatured from './AppHomeSaleFeatured';


export default function AppHomeSale() {

  return (
    <>         
    <AppHomeSaleFeatured />
    <Divider sx={{my:3}}/>
    </>
  );

}
