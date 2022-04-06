import * as React from 'react';
import { Divider } from '@mui/material';
import AppHomeMagazineFeatured from './AppHomeMagazineFeatured';
import GeneralAppMarket from '../../../../pages/dashboard/GeneralAppMarket';


export default function AppHomeMagazine() {

  return (
    <>         
    <AppHomeMagazineFeatured />
    <Divider sx={{my:3}}/>
     <GeneralAppMarket />
    </>
  );
}
