import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Divider, Typography, Stack, MenuItem, MenuList, ListItemIcon } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH, PATH_PAGE } from '../../../../routes/paths';
// hooks
import useAuth from '../../../../hooks/useAuth';
import MyAvatar from '../../../../components/MyAvatar';
import SettingMode from '../../../../components/settings/SettingMode';
import Iconify from '../../../../components/Iconify';

export default function AppUserMenu() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('로그아웃 할 수가 없어요!', { variant: 'error' });
    }
  };

  const handleLogin = async () => {
    try {
      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('로그아웃 할 수가 없어요!', { variant: 'error' });
    }
  };


  

// ----------------------------------------------------------------------

const MENU_OPTIONS = [  
  {
  menu:'바로가기'
  },
  {
    label: '홈',
    linkTo: '/dashboard/app/home',
    icon: <Iconify icon='ant-design:home-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
  {
    label: '마이페이지',
    linkTo: '/dashboard/mypage/prof',
    icon: <Iconify icon='ant-design:user-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
  {
    menu:'고객센터'
  },
  {
    label: '공지사항',
    linkTo: PATH_DASHBOARD.blog.notices,
    icon: <Iconify icon='ant-design:profile-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
  {
    label: 'FAQ',
    linkTo: PATH_PAGE.faqs,
    icon: <Iconify icon='ant-design:question-circle-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
  {
    label: '신고하기/문의하기/건의하기',
    linkTo: PATH_DASHBOARD.blog.newReport,
    icon: <Iconify icon='ant-design:down-square-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
  {
    menu:'이용약관'
  },
  {
    label: '라이더타운 이용약관',
    linkTo: PATH_PAGE.faqs,
    icon: null,
  },
  {
    label: '개인정보처리방침',
    linkTo: PATH_PAGE.faqs,
    icon:null,
  },
  {
    label: '전자상거래 이용약관',
    linkTo: PATH_PAGE.faqs,
    icon:null,
  },
];

  return (
    <MenuList>
        <Stack sx={{ p: 1 }}>
          <Box sx={{width:'100%'}}>
            <Divider sx={{ borderStyle: 'dashed' }} />
              <MenuItem sx={{my:1}} onClick={handleLogin}>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={1}  sx={{width:'100%'}}>
                    <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1}>
                    <Typography variant="h4" >
                        라이더타운
                      </Typography>
                      <Typography variant="subtitle2"  sx={{ color: 'text.disabled' }} >
                        로그인 및 회원가입
                      </Typography>
                    </Stack>
                    <Iconify icon='ant-design:right-outlined' sx={{width:20, height:20, color:'text.secondary'}}/>
                  </Stack>
              </MenuItem>
          </Box>
        </Stack>
        {user && 
        (
        <Stack sx={{ p: 1 }}>
              <Box>
                <MenuItem sx={{my:1}}>
                  <ListItemIcon>
                   <MyAvatar sx={{width:48, height:48, mr:1}} />
                  </ListItemIcon>
              <Box>
            <Typography variant="subtitle2" noWrap>
                  {user?.nickname}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user?.email}
            </Typography>
            </Box>
              </MenuItem>
              </Box>
        </Stack>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem  sx={{ mx: 1 }}>
          <ListItemIcon>
            <Iconify icon='ant-design:setting-outlined' sx={{width:28, height:28, color:'text.primary'}} />
          </ListItemIcon>
          <SettingMode />
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => !option.menu ? 
          (
            <Box key={option.label}>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem to={option.linkTo} component={RouterLink} sx={{my:1}}>
            {option.icon && 
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>}
              {option.label}
            </MenuItem>
            </Box>
          )
          : 
          ( 
            <Box key={option.menu} sx={{my:1}}>
            <Typography variant="subtitle3" sx={{m:2, color:'text.disabled'}}>
             {option.menu}
            </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {user && (
          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
             <ListItemIcon>
              <Iconify icon='ant-design:export-outlined' sx={{width:28, height:28, color:'text.primary'}} />
            </ListItemIcon>
            로그아웃
          </MenuItem>
        )}

        <Box sx={{height:100}}/>
        <Box  sx={{width:'100%', height:48, color:'text.secondary', position:'fixed', bottom:80}}>
        <Stack justifyContent='center' alignItems='center'>
        <Iconify icon='ant-design:close-circle-outlined' onClick={() => navigate(-1)} sx={{width:48, height:48, color:'text.secondary'}}/>
        </Stack>
        </Box>
    </MenuList>
  );
}
