import * as React from 'react';
import { Divider } from '@mui/material';
import AppHomeBrandFeatured from './AppHomeBrandFeatured';
import GeneralAppMarket from '../../../../pages/dashboard/GeneralAppMarket';


export default function AppHomeBrand() {

  return (
    <>         
    <AppHomeBrandFeatured />
    <Divider sx={{my:3}}/>
     <GeneralAppMarket />
    </>
  );
}
