import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
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
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'kakaologin/callback', element: <Kakaologincallback /> },      
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
/*     {
      path: 'dashboard',
      element: (
        <>
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>   --------------------------> axios.post 는 모두 어스가드
        </>
      ), */
      {
        path: 'dashboard',
        element: (
          <>
            <DashboardLayout />
          </>
        ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> }, // ok
        { path: 'map', element: <GeneralMap /> }, // ok
        { path: 'riding', element: <GeneralRiding /> }, // ok
        { path: 'clubs', element: <Generalclub /> }, // ok
        { path: 'garages', element: <Generalgarage /> }, // ok
        { path: 'shop', element: <Generalshop /> }, // ok
        { path: 'market/:option', element: <Generalmarket /> }, // ok
        { path: 'marketu/:option', element: <Generalmarketu /> }, // ok
        { path: 'clubmy', element: <ClubMy /> }, // ok
        // ----------------------------------------------------
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'all-e-commerce',
          children: [
            { element: <Navigate to="/dashboard/all-e-commerce/shop" replace />, index: true },// ok
            { path: 'checkout', element: <AEcommerceCheckout /> }, // ok
          ],
        },
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
            { path: 'motocyclesupplies', element: <UEmotocyclesupplies /> },
            { path: 'product/detail/:id', element: <UEcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/newmoto', element: <UEcommerceProductCreate /> },
            { path: 'product/newgear', element: <UEcommerceProductCreate /> },
            { path: 'product/newparts', element: <UEcommerceProductCreate /> },
            { path: 'product/:id/edit', element: <EcommerceProductCreate /> },
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
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'garage', 
          children: [
            { element: <Navigate to="/dashboard/garage/profile" replace />, index: true },
            { path: 'profile', element: <GarageProfile /> },
            { path: 'profile/:id', element: <GarageProfile /> },
            { path: 'cards', element: <GarageCards /> },
            { path: 'reservation', element: <Garagecheckout /> },
            { path: 'record', element: <Garagerecord /> },
            { path: 'ask', element: <Garagecheckoutask /> },
            { path: 'list', element: <GarageList /> },
            { path: 'new', element: <GarageCreate /> },
            { path: 'map', element: <GarageMap /> },
            { path: ':id/edit', element: <GarageCreate /> },
            { path: 'account', element: <GarageAccount /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'notices', element: <Blognotices /> },   // ok                   
            { path: 'posts', element: <BlogPosts /> },     // ok                  
            { path: 'dingstas', element: <BlogDingstas /> },          
            { path: 'reports', element: <BlogReports /> },    
            { path: 'post/:id', element: <BlogPost /> },
            { path: 'notice/:id', element: <BlogNotice /> },
            { path: 'dingsta/:id', element: <BlogDingsta /> },
            { path: 'report/:id', element: <BlogReport /> },
            { path: 'new-post', element: <AuthGuard><BlogNewPost /></AuthGuard> },
            { path: 'new-notice', element: <AuthGuard><BlogNewPost /></AuthGuard> },
            { path: 'new-dingsta', element: <AuthGuard><BlogNewPost /></AuthGuard> },
            { path: 'new-report', element: <BlogNewPost />},
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
            { path: 'clubnew/:id/edit', element: <AuthGuard><ClubCreate /></AuthGuard> },
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
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Kakaologincallback = Loadable(lazy(() => import('../pages/auth/Kakaologincallback')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralMap = Loadable(lazy(() => import('../pages/dashboard/GeneralMap')));
const GeneralRiding = Loadable(lazy(() => import('../pages/dashboard/GeneralRiding')));
const Generalclub = Loadable(lazy(() => import('../pages/dashboard/Generalclub')));
const Generalgarage = Loadable(lazy(() => import('../pages/dashboard/Generalgarage')));
const Generalshop = Loadable(lazy(() => import('../pages/dashboard/Generalshop')));
const Generalmarket = Loadable(lazy(() => import('../pages/dashboard/Generalmarket')));
const Generalmarketu = Loadable(lazy(() => import('../pages/dashboard/Generalmarketu')));


const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));


const AEcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/AEcommerceCheckout')));
// 신품거래
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const Emotocycle = Loadable(lazy(() => import('../pages/dashboard/Emotocycle')));
const Emotocyclegear = Loadable(lazy(() => import('../pages/dashboard/Emotocyclegear')));
const Emotocycleparts = Loadable(lazy(() => import('../pages/dashboard/Emotocycleparts')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
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
const UEmotocyclesupplies = Loadable(lazy(() => import('../pages/dashboard/UEmotocyclesupplies')));
const UEcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/UEcommerceProductCreate')));
const UEcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/UEcommerceProductDetails')));


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
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
// 개러지
const GarageProfile = Loadable(lazy(() => import('../pages/dashboard/GarageProfile')));
const GarageCards = Loadable(lazy(() => import('../pages/dashboard/GarageCards')));
const GarageMap = Loadable(lazy(() => import('../pages/dashboard/GarageMap')));
const Garagecheckout = Loadable(lazy(() => import('../pages/dashboard/Garagecheckout')));
const Garagecheckoutask = Loadable(lazy(() => import('../pages/dashboard/Garagecheckoutask')));
const Garagerecord = Loadable(lazy(() => import('../pages/dashboard/Garagerecord')));
const GarageList = Loadable(lazy(() => import('../pages/dashboard/GarageList')));
const GarageAccount = Loadable(lazy(() => import('../pages/dashboard/GarageAccount')));
const GarageCreate = Loadable(lazy(() => import('../pages/dashboard/GarageCreate')));


const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const ChatIo = Loadable(lazy(() => import('../pages/dashboard/ChatIo')));
const ChatList = Loadable(lazy(() => import('../pages/dashboard/ChatList')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));
// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
