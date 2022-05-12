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
        { path: 'garage/profile', element: <GarageProfile /> },
        { path: 'garage/profile/:nickname', element: <GarageProfile /> },
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

        { path: 'clubs', element: <GeneralClub /> }, 
        
        { path: 'garages', element: <Generalgarage /> }, 
        { path: 'garages/:value', element: <Generalgarage /> }, 
        { path: 'garages/:value/:tab', element: <Generalgarage /> }, 
        { path: 'garages/:value/:tab/:params', element: <Generalgarage /> }, 

        { path: 'shop/:value/:tab/:paging', element: <Generalshop /> }, 
        { path: 'shop/:value/:tab/:paging/:option', element: <Generalshop /> }, 

        { path: 'checkout', element: <AEcommerceCheckout /> }, 
        { path: 'checkout/:value', element: <AEcommerceCheckout /> }, 
        
        { path: 'mypage', element: <GeneralUser /> }, 
        { path: 'mypage/:value', element: <GeneralUser /> }, 

        { path: 'market/:tab/:paging', element: <Generalmarket /> }, 
        { path: 'marketu/:tab/:paging', element: <Generalmarketu /> }, 
        { path: 'marketu/:tab/:paging/:option', element: <Generalmarketu /> }, 

        { path: 'clubmy', element: <ClubMy /> }, 
        { path: 'menu', element: <GeneralUserMenu /> }, 
        { path: 'checkout', element: <AEcommerceCheckout /> }, 
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
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'motocycle', element: <UEmotocycle /> },
            { path: 'motocyclegarage', element: <UEmotocyclegarage /> },
            { path: 'motocyclegear', element: <UEmotocyclegear /> },
            { path: 'motocycleparts', element: <UEmotocycleparts /> },
            { path: 'product/detail/:id', element: <UEcommerceProductDetails /> },
            { path: 'productetc/detail/:id', element: <UEcommerceProductDetailsEtc /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/newmoto', element: <UEcommerceProductCreate /> },
            { path: 'product/newetc', element: <UEcommerceProductCreate /> },
            { path: 'product/newmoto/:id/edit', element: <UEcommerceProductCreate /> },
            { path: 'product/newetc/:id/edit', element: <UEcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'profile/:nickname', element: <UserProfile /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'garage',
          children: [
            { element: <Navigate to="/dashboard/garage/profile" replace />, index: true },
            { path: 'posts', element: <GaragePosts /> },
            { path: 'post', element: <GaragePost /> },
            { path: 'asks', element: <GarageAsks /> },
            { path: 'ask', element: <GarageAsk /> },
            { path: 'cards', element: <GarageCards /> },
            { path: 'card', element: <GarageCard /> },
            { path: 'map', element: <GarageMap /> },
            { path: 'new-post', element: (<AuthGuard><GarageNewPost /></AuthGuard>),},
            { path: 'new-ask', element: (<AuthGuard><GarageNewPost /></AuthGuard>),},
            { path: 'new-card', element: (<AuthGuard><GarageNewPost /></AuthGuard>),},
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
            { path: 'club', element: <Club /> },
            { path: 'clubroom/:id', element: <Clubroom /> },
            { path: 'clubdetail/:id', element: <ClubDetails /> },
            { path: 'list', element: <ClubList /> },
            { path: 'clubnew', element: <ClubCreate /> },
            {
              path: 'clubnew/:id/edit',
              element: (
                <AuthGuard>
                  <ClubCreate />
                </AuthGuard>
              ),
            },
            { path: 'checkout', element: <ClubCheckout /> },
            { path: 'invoice', element: <ClubInvoice /> },
          ],
        },

        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
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
const GeneralClub = Loadable(lazy(() => import('../pages/dashboard/GeneralClub')));
const Generalgarage = Loadable(lazy(() => import('../pages/dashboard/GeneralGarage')));
const GeneralMotocycle = Loadable(lazy(() => import('../pages/dashboard/GeneralMotocycle')));
const Generalshop = Loadable(lazy(() => import('../pages/dashboard/GeneralShop')));
const Generalmarket = Loadable(lazy(() => import('../pages/dashboard/GeneralMarket')));
const Generalmarketu = Loadable(lazy(() => import('../pages/dashboard/GeneralMarketu')));
const GeneralUser = Loadable(lazy(() => import('../pages/dashboard/GeneralUser')));
const GeneralUserMenu = Loadable(lazy(() => import('../pages/dashboard/GeneralUserMenu')));

const AEcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/AEcommerceCheckout')));
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
const Club = Loadable(lazy(() => import('../pages/dashboard/Club')));
const ClubMy = Loadable(lazy(() => import('../pages/dashboard/ClubMy')));
const Clubroom = Loadable(lazy(() => import('../pages/dashboard/Clubroom')));
const ClubDetails = Loadable(lazy(() => import('../pages/dashboard/ClubDetails')));
const ClubList = Loadable(lazy(() => import('../pages/dashboard/ClubList')));
const ClubCreate = Loadable(lazy(() => import('../pages/dashboard/ClubCreate')));
const ClubCheckout = Loadable(lazy(() => import('../pages/dashboard/ClubCheckout')));
const ClubInvoice = Loadable(lazy(() => import('../pages/dashboard/ClubInvoice')));

// 중고거래
const UEmotocycle = Loadable(lazy(() => import('../pages/dashboard/UEmotocycle')));
const UEmotocyclegarage = Loadable(lazy(() => import('../pages/dashboard/UEmotocyclegarage')));
const UEmotocyclegear = Loadable(lazy(() => import('../pages/dashboard/UEmotocyclegear')));
const UEmotocycleparts = Loadable(lazy(() => import('../pages/dashboard/UEmotocycleparts')));
const UEcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/UEcommerceProductCreate')));
const UEcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/UEcommerceProductDetails')));
const UEcommerceProductDetailsEtc = Loadable(lazy(() => import('../pages/dashboard/UEcommerceProductDetailsEtc')));

// 읽기전용 게시글
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogDingstas = Loadable(lazy(() => import('../pages/dashboard/BlogDingstas')));
const Blognotices = Loadable(lazy(() => import('../pages/dashboard/Blognotices')));
const BlogReports = Loadable(lazy(() => import('../pages/dashboard/BlogReports')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNotice = Loadable(lazy(() => import('../pages/dashboard/BlogNotice')));
const BlogDingsta = Loadable(lazy(() => import('../pages/dashboard/BlogDingsta')));
const BlogReport = Loadable(lazy(() => import('../pages/dashboard/BlogReport')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
// 유저
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
// 개러지
const GarageNewPost = Loadable(lazy(() => import('../pages/dashboard/GarageNewPost')));
const GaragePosts = Loadable(lazy(() => import('../pages/dashboard/GaragePosts')));
const GaragePost = Loadable(lazy(() => import('../pages/dashboard/GaragePost')));
const GarageAsks = Loadable(lazy(() => import('../pages/dashboard/GarageAsks')));
const GarageAsk = Loadable(lazy(() => import('../pages/dashboard/GarageAsk')));
const GarageCards = Loadable(lazy(() => import('../pages/dashboard/GarageCards')));
const GarageCard = Loadable(lazy(() => import('../pages/dashboard/GarageCard')));
const GarageProfile = Loadable(lazy(() => import('../pages/dashboard/GarageProfile')));
const GarageMap = Loadable(lazy(() => import('../pages/dashboard/GarageMap')));

const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const ChatIo = Loadable(lazy(() => import('../pages/dashboard/ChatIo')));
const ChatList = Loadable(lazy(() => import('../pages/dashboard/ChatList')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
