import * as React from 'react';
import { Divider } from '@mui/material';
import AppHomeBestFeatured from './AppHomeBestFeatured';
import GeneralAppMarket from '../../../../pages/dashboard/GeneralAppMarket';


export default function AppHomeBest() {

  return (
    <>         
    <AppHomeBestFeatured />
    <Divider sx={{my:3}}/>
     <GeneralAppMarket />
    </>
  );
}
