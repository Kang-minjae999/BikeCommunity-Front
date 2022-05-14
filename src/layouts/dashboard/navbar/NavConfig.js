import HomeIcon from '@mui/icons-material/Home';
import CommentIcon from '@mui/icons-material/Comment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import StoreIcon from '@mui/icons-material/Store';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------


const navConfig = [
  {
    subheader: 'Ridertown',
    items: [ 
      { title: '홈', path: PATH_DASHBOARD.general.app, icon: (<HomeIcon sx={{ width: 1, height: 1 }} />)},
      { title: '정비', path: PATH_DASHBOARD.general.garage, icon: (<EngineeringIcon sx={{ width: 1, height: 1 }} />) },
      { title: '라이딩', path: PATH_DASHBOARD.general.riding, icon: (<TwoWheelerIcon sx={{ width: 1, height: 1 }} />) },
      { title: '바이크', path: PATH_DASHBOARD.general.moto, icon: (<SportsMotorsportsIcon sx={{ width: 1, height: 1 }} />) },
      { title: '라이더', path: PATH_DASHBOARD.general.rider, icon: (<CommentIcon sx={{ width: 1, height: 1 }} />) },
      { title: '장바구니', path: PATH_DASHBOARD.general.checkout ,icon: <ShoppingCartIcon sx={{ width: 1, height: 1 }} />},
      { title: '마이페이지', path: PATH_DASHBOARD.general.mypage ,icon: (<PersonIcon sx={{ width: 1, height: 1 }}/>) },
    ],
  },
  {
    subheader: 'MARKET',
    items: [
      {
        title: '신품거래',
        path: PATH_DASHBOARD.shop.root,
        icon: <StoreIcon sx={{ width: 1, height: 1 }}/>,
        children: [
          { title: '브랜드', path: PATH_DASHBOARD.shop.brand },
          { title: '장르', path: PATH_DASHBOARD.shop.genre },
          { title: '카테고리', path: PATH_DASHBOARD.shop.category },
        ],
      },
      {
        title: '중고거래',
        path: PATH_DASHBOARD.shop.root,
        icon: <StorefrontIcon sx={{ width: 1, height: 1 }}/>,
        children: [
          { title: '바이크', path: PATH_DASHBOARD.usedshop.bike },
          { title: '개인', path: PATH_DASHBOARD.usedshop.bikeuser },
          { title: '정비소', path: PATH_DASHBOARD.usedshop.bikegarage },
          { title: '기타', path: PATH_DASHBOARD.usedshop.etc },
        ],
      },
    ]
  },
  {
    subheader: 'GARAGE',
    items: [
      {
        title: '정비소',
        path: PATH_DASHBOARD.garage.root,
        icon: <EngineeringIcon sx={{ width: 1, height: 1 }}/>,
        children: [
          { title: '정비소', path: PATH_DASHBOARD.garage.card },
          { title: '커스텀', path: PATH_DASHBOARD.garage.custom },
          { title: '위치찾기', path: PATH_DASHBOARD.garage.map },
          { title: '정비질문', path: PATH_DASHBOARD.garage.ask },
          { title: '정비질문하기', path: PATH_DASHBOARD.garage.newask },
          { title: '정비글', path: PATH_DASHBOARD.garage.post },
            ],
      },
    ]
  },
  {
    subheader: 'COMMUNITY',
    items: [
      {
        title: '커뮤니티',
        path: PATH_DASHBOARD.garage.root,
        icon: <PhotoFilterIcon sx={{ width: 1, height: 1 }}/>,
        children: [
          { title: '포스트', path: PATH_DASHBOARD.blog.posts },
          { title: '딩스타그램', path: PATH_DASHBOARD.blog.dingstas },
          { title: '딩스타글쓰기', path: PATH_DASHBOARD.blog.newDingsta },
          { title: '공지사항', path: PATH_DASHBOARD.blog.notices },
       ],
      },
    ]
  },
  {
    subheader: 'CLUB',
    items: [
      {
        title: '클럽',
        path: PATH_DASHBOARD.garage.root,
        icon: <LocalOfferIcon sx={{ width: 1, height: 1 }}/>,
        children: [
          { title: '포스트', path: PATH_DASHBOARD.blog.posts },
          { title: '딩스타그램', path: PATH_DASHBOARD.blog.dingstas },
          { title: '딩스타글쓰기', path: PATH_DASHBOARD.blog.newDingsta },
          { title: '공지사항', path: PATH_DASHBOARD.blog.notices },
       ],
      },
    ]
  },
  {
    subheader: 'FORRIDER',
    items: [
      {
        title: '플러스',
        path: PATH_DASHBOARD.motocycle.root,
        icon: <CommentIcon sx={{ width: 1, height: 1 }}/>,
        children: [
          { title: '렌트', path: PATH_DASHBOARD.motocycle.rent },
          { title: '리스', path: PATH_DASHBOARD.motocycle.lease },
          { title: '교육', path: PATH_DASHBOARD.motocycle.edu },
          { title: '세차', path: PATH_DASHBOARD.motocycle.clean },
          { title: '환경검사', path: PATH_DASHBOARD.motocycle.test },

          { title: '바이크프로필', path: PATH_DASHBOARD.rider.bikep },
          { title: '긴급출동', path: PATH_DASHBOARD.rider.emergency },
          { title: '용달', path: PATH_DASHBOARD.rider.lorry },
          { title: '사고처리', path: PATH_DASHBOARD.rider.crash },
          { title: '보험', path: PATH_DASHBOARD.rider.insurance },
       ],
      },
    ]
  },
];

export default navConfig;
