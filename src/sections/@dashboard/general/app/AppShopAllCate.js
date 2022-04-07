import { CardHeader, Divider } from '@mui/material';
import Appmarketcategory2mobile from './Appmarketcategory2mobile';
import Appmarketcategorymobile from './Appmarketcategorymobile';


export default function AppShopAllCate() {
 
  return (
    <>
    <CardHeader title='신품' sx={{mb:2}}/>
    <Appmarketcategorymobile />
    <Divider sx={{my:2}}/>
    <CardHeader title='중고' sx={{mb:2}}/>
    <Appmarketcategory2mobile />
    </>
  );
}
