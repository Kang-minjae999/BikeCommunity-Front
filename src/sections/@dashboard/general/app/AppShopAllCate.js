import { CardHeader, Divider } from '@mui/material';
import Appmarketcategory from './Appmarketcategory';
import Appmarketcategory2 from './Appmarketcategory2';


export default function AppShopAllCate() {
 
  return (
    <>
    <CardHeader title='신품' sx={{mb:2}}/>
    <Appmarketcategory />
    <Divider sx={{my:2}}/>
    <CardHeader title='중고' sx={{mb:2}}/>
    <Appmarketcategory2 />
    </>
  );
}
