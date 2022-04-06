import * as React from 'react';
import { Divider } from '@mui/material';
import AppFeatured from './AppFeatured';
import GeneralAppMarket from '../../../../pages/dashboard/GeneralAppMarket';


export default function AppHomeMain() {

  return (
    <>         
    <AppFeatured />
    <Divider sx={{my:3}}/>
     <GeneralAppMarket />
    </>
  );

}
