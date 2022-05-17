// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: '메인화면',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/dashboard/app/home',
  },  
  {
    title: '',
    icon: '',
    path: '/dashboard/app/home',
  },
];

export default menuConfig;
