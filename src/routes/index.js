import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import DashboardLayoutForProfile from '../layouts/dashboard/indexForProfile';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'kakaologin',
          element: (
              <LoginKakaoPage />
          ),
        },
        {
          path: 'naverlogin',
          element: (
              <LoginNaverPage />
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        {
          path: 'loginafter',
          element: (
              <LoginAfter />
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },
    {
      path: 'dashboard',
      element: <DashboardLayoutForProfile />,
      children: [
        { element: <Navigate to="/dashboard/app" replace />, index: true },
        { path: 'profile', element: <GeneralProfile /> },
        { path: 'profile/:nickname', element: <GeneralProfile /> },
        { path: 'profile/:nickname/:profilevalue', element: <GeneralProfile /> },
      ],
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace />, index: true },
        { path: 'app', element: <GeneralApp /> }, 
        { path: 'app/:value', element: <GeneralApp /> }, 
        { path: 'app/:value/:tab', element: <GeneralApp /> }, 
        { path: 'app/:value/:tab/:paging', element: <GeneralApp /> }, 
        { path: 'app/:value/:tab/:paging/:option', element: <GeneralApp /> }, 

        { path: 'riding', element: <GeneralRiding /> }, 
        { path: 'riding/:value', element: <GeneralRiding /> }, 
        { path: 'riding/:value/:icon', element: <GeneralRiding /> }, 

        { path: 'rider', element: <GeneralRider /> }, 
        { path: 'rider/:value', element: <GeneralRider /> }, 

        { path: 'shop/:value/:tab/:paging', element: <Generalshop /> }, 
        { path: 'shop/:value/:tab/:paging/:option', element: <Generalshop /> }, 

        { path: 'motocycle', element: <GeneralMotocycle /> },
        { path: 'motocycle/:value', element: <GeneralMotocycle /> },
        { path: 'motocycle/:value/:tab', element: <GeneralMotocycle /> },
        { path: 'motocycle/:value/:tab/:params', element: <GeneralMotocycle /> },
        
        { path: 'garages', element: <Generalgarage /> }, 
        { path: 'garages/:value', element: <Generalgarage /> }, 
        { path: 'garages/:value/:tab', element: <Generalgarage /> }, 
        { path: 'garages/:value/:tab/:params', element: <Generalgarage /> }, 

        { path: 'shop/:value/:tab/:paging', element: <Generalshop /> }, 
        { path: 'shop/:value/:tab/:paging/:option', element: <Generalshop /> }, 

        { path: 'checkout', element: <AllEcommerceCheckout /> }, 
        { path: 'checkout/:value', element: <AllEcommerceCheckout /> }, 
        
        { path: 'mypage', element: <GeneralUser /> }, 
        { path: 'mypage/:value', element: <GeneralUser /> }, 
        { path: 'mypage/:value/:profilevalue', element: <GeneralUser /> }, 

        { path: 'market/:tab/:paging', element: <Generalmarket /> }, 
        { path: 'marketu/:tab/:paging', element: <Generalmarketu /> }, 
        { path: 'marketu/:tab/:paging/:option', element: <Generalmarketu /> }, 

        { path: 'menu', element: <GeneralUserMenu /> }, 
        { path: 'mapnewmarker', element: <GeneralMapNewMarker /> },         
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'motocycle', element: <Emotocycle /> },
            { path: 'motocyclegear', element: <Emotocyclegear /> },
            { path: 'motocycleparts', element: <Emotocycleparts /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/newedu', element: <EcommerceProductCreateEdu /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> },
          ],
        },
        {
          path: 'used-e-commerce',
          children: [
            { element: <Navigate to="/dashboard/used-e-commerce/shop" replace />, index: true },
            { path: 'product/detail/:id', element: <UEcommerceProductDetails /> },
            { path: 'productetc/detail/:id', element: <UEcommerceProductDetailsEtc /> },
            { path: 'product/newmoto', element: <UEcommerceProductCreate /> },
            { path: 'product/newetc', element: <UEcommerceProductCreate /> },
            { path: 'product/newmoto/:id/edit', element: <UEcommerceProductCreate /> },
            { path: 'product/newetc/:id/edit', element: <UEcommerceProductCreate /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard" replace />, index: true },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'garage',
          children: [
            { element: <Navigate to="/dashboard/garage/profile" replace />, index: true },
            { path: 'posts', element: <GaragePosts /> },
            { path: 'post/:id', element: <GaragePost /> },
            { path: 'asks', element: <GarageAsks /> },
            { path: 'ask/:id', element: <GarageAsk /> },
            { path: 'cards', element: <GarageCards /> },
            { path: 'card/:id', element: <GarageCard /> },
            { path: 'map', element: <GarageMap /> },
            { path: 'new-post', element: (<GarageNewPost />),},
            { path: 'new-ask', element: (<GarageNewPost />),},
            { path: 'new-card', element: (<GarageNewPost />),},
            { path: 'new-reservation', element: (<GarageNewPost />),},
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'notices', element: <Blognotices /> }, 
            { path: 'posts', element: <BlogPosts /> }, 
            { path: 'dingstas', element: <BlogDingstas /> },
            { path: 'reports', element: <BlogReports /> },
            { path: 'post/:id', element: <BlogPost /> },
            { path: 'notice/:id', element: <BlogNotice /> },
            { path: 'dingsta/:id', element: <BlogDingsta /> },
            { path: 'report/:id', element: <BlogReport /> },
            { path: 'new-post', element: (<AuthGuard><BlogNewPost /></AuthGuard>),},
            { path: 'new-notice', element: (<AuthGuard><BlogNewPost /></AuthGuard>),},
            { path: 'new-dingsta', element: (<AuthGuard><BlogNewPost /></AuthGuard>),},
            { path: 'new-report', element: (<AuthGuard><BlogNewPost /></AuthGuard>),},
          ],
        },
        {
          path: 'club',
          children: [
            { element: <Navigate to="/dashboard/club/club" replace />, index: true },
            // { path: 'club', element: <Club /> },
            // { path: 'clubroom/:id', element: <Clubroom /> },
            // { path: 'clubdetail/:id', element: <ClubDetails /> },
            // { path: 'list', element: <ClubList /> },
            { path: 'clubnew', element: <ClubCreate /> },
            {
              path: 'clubnew/:id/edit',
              element: (
                <AuthGuard>
                  <ClubCreate />
                </AuthGuard>
              ),
            },
            // { path: 'checkout', element: <ClubCheckout /> },
            // { path: 'invoice', element: <ClubInvoice /> },
          ],
        },
        {
          path: 'chatting',
          children: [
            { element: <Navigate to="/dashboard/chatting/list" replace />, index: true },
            { path: 'new', element: <ChatIo /> },
            { path: 'room/:conversationKey', element: <ChatIo /> },
            { path: 'list', element: <ChatList /> },
          ],
        },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const LoginKakaoPage = Loadable(lazy(() => import('../pages/auth/LoginKakaoPage')));
const LoginNaverPage = Loadable(lazy(() => import('../pages/auth/LoginNaverPage')));
const LoginAfter = Loadable(lazy(() => import('../pages/auth/LoginAfter')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralMapNewMarker = Loadable(lazy(() => import('../pages/dashboard/GeneralMapNewMarker')));
const GeneralRider = Loadable(lazy(() => import('../pages/dashboard/GeneralRider')));
const GeneralRiding = Loadable(lazy(() => import('../pages/dashboard/GeneralRiding')));
const Generalgarage = Loadable(lazy(() => import('../pages/dashboard/GeneralGarage')));
const GeneralMotocycle = Loadable(lazy(() => import('../pages/dashboard/GeneralMotocycle')));
const Generalshop = Loadable(lazy(() => import('../pages/dashboard/GeneralShop')));
const Generalmarket = Loadable(lazy(() => import('../pages/dashboard/GeneralMarket')));
const Generalmarketu = Loadable(lazy(() => import('../pages/dashboard/GeneralMarketu')));
const GeneralUser = Loadable(lazy(() => import('../pages/dashboard/GeneralUser')));
const GeneralUserMenu = Loadable(lazy(() => import('../pages/dashboard/GeneralUserMenu')));
const GeneralProfile = Loadable(lazy(() => import('../pages/dashboard/GeneralProfile')));

const AllEcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/AllEcommerceCheckout')));
// 신품거래
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const Emotocycle = Loadable(lazy(() => import('../pages/dashboard/Emotocycle')));
const Emotocyclegear = Loadable(lazy(() => import('../pages/dashboard/Emotocyclegear')));
const Emotocycleparts = Loadable(lazy(() => import('../pages/dashboard/Emotocycleparts')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceProductCreateEdu = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreateEdu')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
const EcommerceInvoice = Loadable(lazy(() => import('../pages/dashboard/EcommerceInvoice')));
// 동호회
const ClubCreate = Loadable(lazy(() => import('../pages/dashboard/ClubCreate')));

// 중고거래
const UEcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/UEcommerceProductCreate')));
const UEcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/UEcommerceProductDetails')));
const UEcommerceProductDetailsEtc = Loadable(lazy(() => import('../pages/dashboard/UEcommerceProductDetailsEtc')));

// 읽기전용 게시글
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogDingstas = Loadable(lazy(() => import('../pages/dashboard/BlogDingstas')));
const Blognotices = Loadable(lazy(() => import('../pages/dashboard/BlogNotices')));
const BlogReports = Loadable(lazy(() => import('../pages/dashboard/BlogReports')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNotice = Loadable(lazy(() => import('../pages/dashboard/BlogNotice')));
const BlogDingsta = Loadable(lazy(() => import('../pages/dashboard/BlogDingsta')));
const BlogReport = Loadable(lazy(() => import('../pages/dashboard/BlogReport')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
// 유저
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
// 개러지
const GarageNewPost = Loadable(lazy(() => import('../pages/dashboard/GarageNewPost')));
const GaragePosts = Loadable(lazy(() => import('../pages/dashboard/GaragePosts')));
const GaragePost = Loadable(lazy(() => import('../pages/dashboard/GaragePost')));
const GarageAsks = Loadable(lazy(() => import('../pages/dashboard/GarageAsks')));
const GarageAsk = Loadable(lazy(() => import('../pages/dashboard/GarageAsk')));
const GarageCards = Loadable(lazy(() => import('../pages/dashboard/GarageCards')));
const GarageCard = Loadable(lazy(() => import('../pages/dashboard/GarageCard')));
const GarageMap = Loadable(lazy(() => import('../pages/dashboard/GarageMap')));

const ChatIo = Loadable(lazy(() => import('../pages/dashboard/ChatIo')));
const ChatList = Loadable(lazy(() => import('../pages/dashboard/ChatList')));
// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
