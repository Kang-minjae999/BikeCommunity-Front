// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginafter: path(ROOTS_AUTH, '/loginafter'),
  Kakaologincallback: path(ROOTS_AUTH, '/kakaologin/callback'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  home: '/',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app/home'),
    garage: path(ROOTS_DASHBOARD, '/garages/garage'),
    riding: path(ROOTS_DASHBOARD, '/riding/map/calendar'),
    moto: path(ROOTS_DASHBOARD, '/motocycle/rent'),
    rider: path(ROOTS_DASHBOARD, '/rider/rent'),
    checkout: path(ROOTS_DASHBOARD, '/checkout/new'),
    mypage: path(ROOTS_DASHBOARD, '/mypage'),
    menu: path(ROOTS_DASHBOARD, '/menu'),

    newmapmarker: path(ROOTS_DASHBOARD, '/mapnewmarker'),

    shop: path(ROOTS_DASHBOARD, '/shop/all/all/0'),
    shopmarket: path(ROOTS_DASHBOARD, '/shop/market/all/0'),
    shopbrand: path(ROOTS_DASHBOARD, '/shop/brand/all/0'),
    shopmoto: path(ROOTS_DASHBOARD, '/shop/moto/all/0'),
    shopused: path(ROOTS_DASHBOARD, '/shop/used'),

    market: path(ROOTS_DASHBOARD, '/market/biketrade/0'),
    marketu: path(ROOTS_DASHBOARD, '/marketu/biketrade/0'),

    garagecard: path(ROOTS_DASHBOARD, '/garages/garage'),
    garagecustom: path(ROOTS_DASHBOARD, '/garages/custom'),
    garagemap: path(ROOTS_DASHBOARD, '/garages/map'),
    garageask: path(ROOTS_DASHBOARD, '/garages/ask'),
    garageposts: path(ROOTS_DASHBOARD, '/garages/posts'),


    club: path(ROOTS_DASHBOARD, '/clubs'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    clubmy: path(ROOTS_DASHBOARD, '/clubmy'),
  },
  shop: {
    root: path(ROOTS_DASHBOARD, '/app/home'),
    brand: path(ROOTS_DASHBOARD, '/app/brand'),
    genre: path(ROOTS_DASHBOARD, '/app/genre'),
    category: path(ROOTS_DASHBOARD, '/app/category'),
    used: path(ROOTS_DASHBOARD, '/app/used'),
  },
  usedshop: {
    bike: path(ROOTS_DASHBOARD, '/app/used/biketrade/0'),
    bikeuser: path(ROOTS_DASHBOARD, '/app/used/biketrade-user/0'),
    bikegarage: path(ROOTS_DASHBOARD, '/app/used/biketrade-garage/0'),
    etc: path(ROOTS_DASHBOARD, '/app/used/etctrade/0'),
  },
  garage: {
    root: path(ROOTS_DASHBOARD, '/garage'),
    card: path(ROOTS_DASHBOARD, '/garages/garage'),
    custom: path(ROOTS_DASHBOARD, '/garages/custom'),
    map: path(ROOTS_DASHBOARD, '/garages/map'),
    ask: path(ROOTS_DASHBOARD, '/garages/ask'),
    newask: path(ROOTS_DASHBOARD, '/garage/new-ask'),
    post: path(ROOTS_DASHBOARD, '/garages/posts'),
    newpost: path(ROOTS_DASHBOARD, '/garage/new-post'),
    newcard: path(ROOTS_DASHBOARD, '/garage/new-card'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chatting'),
    new: path(ROOTS_DASHBOARD, '/chatting/new'),
    conversation: path(ROOTS_DASHBOARD, '/chatting/:conversationKey')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/mypage'),
    profile: path(ROOTS_DASHBOARD, '/mypage/prof'),
    checkout: path(ROOTS_DASHBOARD, '/mypage/check'),
    motocycle: path(ROOTS_DASHBOARD, '/mypage/moto'),
    club: path(ROOTS_DASHBOARD, '/mypage/club'),
    setting: path(ROOTS_DASHBOARD, '/mypage/setting'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    notices: path(ROOTS_DASHBOARD, '/blog/notices'),
    dingstas: path(ROOTS_DASHBOARD, '/blog/dingstas'), 
    reports: path(ROOTS_DASHBOARD, '/blog/reports'),   
    post: path(ROOTS_DASHBOARD, '/blog/post/:id'),   
    notice: path(ROOTS_DASHBOARD, '/blog/notice/:id'),   
    dingsta: path(ROOTS_DASHBOARD, '/blog/dingsta/:id'),
    report: path(ROOTS_DASHBOARD, '/blog/report/:id'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post'),
    newNotice: path(ROOTS_DASHBOARD, '/blog/new-notice'),
    newDingsta: path(ROOTS_DASHBOARD, '/blog/new-dingsta'),
    newReport: path(ROOTS_DASHBOARD, '/blog/new-report'),
  },

  alleCommerce: {
    checkout: path(ROOTS_DASHBOARD, '/all-e-commerce/checkout'),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),    
    motocycle: path(ROOTS_DASHBOARD, '/e-commerce/motocycle'),    
    motocyclegear: path(ROOTS_DASHBOARD, '/e-commerce/motocyclegear'),    
    motocycleparts: path(ROOTS_DASHBOARD, '/e-commerce/motocycleparts'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  usedeCommerce: {
    root: path(ROOTS_DASHBOARD, '/used-e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/used-e-commerce/shop'),   
    motocycle: path(ROOTS_DASHBOARD, '/used-e-commerce/motocycle'), 
    motocyclegarage: path(ROOTS_DASHBOARD, '/used-e-commerce/motocyclegarage'),    
    motocyclegear: path(ROOTS_DASHBOARD, '/used-e-commerce/motocyclegear'),  
    motocycleparts: path(ROOTS_DASHBOARD, '/used-e-commerce/motocycleparts'),
    motocyclesupplies: path(ROOTS_DASHBOARD, '/used-e-commerce/motocyclesupplies'),
    product: path(ROOTS_DASHBOARD, '/used-e-commerce/product/detail/:id'),
    productById: path(ROOTS_DASHBOARD, '/used-e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/used-e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/used-e-commerce/product/new'),
    newProductgear: path(ROOTS_DASHBOARD, '/used-e-commerce/product/newgear'),
    newProductparts: path(ROOTS_DASHBOARD, '/used-e-commerce/product/newparts'),
    editById: path(ROOTS_DASHBOARD, '/used-e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, 'used-e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/used-e-commerce/invoice')
  },
  club: {
    root: path(ROOTS_DASHBOARD, '/club'),
    newDingsta: path(ROOTS_DASHBOARD, '/club/new-dingsta'),
    newClub: path(ROOTS_DASHBOARD, '/club/new-club'),
    club: path(ROOTS_DASHBOARD, '/club/club'),    
    clubroom: path(ROOTS_DASHBOARD, '/club/clubroom/:id'),    
    clubdetail: path(ROOTS_DASHBOARD, '/club/clubdetail/:id'),
    productById: path(ROOTS_DASHBOARD, '/club/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/club/list'),
    new: path(ROOTS_DASHBOARD, '/club/clubnew'),
    editById: path(ROOTS_DASHBOARD, '/club/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/club/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/club/invoice')
  },
  motocycle: {
    root: path(ROOTS_DASHBOARD, '/motocycle/rent'),
    rent: path(ROOTS_DASHBOARD, '/motocycle/rent'),    
    lease: path(ROOTS_DASHBOARD, '/motocycle/lease'),    
    edu: path(ROOTS_DASHBOARD, '/motocycle/edu'),
    clean: path(ROOTS_DASHBOARD, '/motocycle/clean'),
    test: path(ROOTS_DASHBOARD, '/motocycle/test'),
  },
  rider: {
    root: path(ROOTS_DASHBOARD, '/rider/bikep'),
    bikep: path(ROOTS_DASHBOARD, '/rider/bikep'),
    emergency: path(ROOTS_DASHBOARD, '/rider/emergency'),    
    lorry: path(ROOTS_DASHBOARD, '/rider/lorry'),    
    crash: path(ROOTS_DASHBOARD, '/rider/crash'),
    insurance: path(ROOTS_DASHBOARD, '/rider/insurance'),
  },
  
};

export const PATH_DOCS = 'http://localhost:3000';
