import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, MenuList, ListItemIcon } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH, PATH_PAGE } from '../../../../routes/paths';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// components
import MenuPopover from '../../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../../components/animate';
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
    label: '홈',
    linkTo: '/dashboard/app',
    icon: <Iconify icon='ant-design:home-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
  {
    label: '마이페이지',
    linkTo: '/dashboard/mypage',
    icon: <Iconify icon='ant-design:user-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
  {
    label: '공지사항',
    linkTo: PATH_DASHBOARD.blog.notices,
    icon: <Iconify icon='ant-design:profile-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
  {
    label: '고객센터',
    linkTo: PATH_PAGE.faqs,
    icon: <Iconify icon='ant-design:question-circle-outlined' sx={{width:28, height:28, color:'text.primary'}} />,
  },
];

  
  return (
    <MenuList>
        {user && (
          <>
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
          </>
        )}

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <Box key={option.label}>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem to={option.linkTo} component={RouterLink} sx={{my:1}}>
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
              {option.label}
            </MenuItem>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem  sx={{ mx: 1 }}>
          <ListItemIcon>
            <Iconify icon='ant-design:setting-outlined' sx={{width:28, height:28, color:'text.primary'}} />
          </ListItemIcon>
          <SettingMode />
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {user && (
          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
             <ListItemIcon>
              <Iconify icon='ant-design:export-outlined' sx={{width:28, height:28, color:'text.primary'}} />
            </ListItemIcon>
            로그아웃
          </MenuItem>
        )}

        {!user && (
          <MenuItem onClick={handleLogin} sx={{ m: 1 }}>
            <ListItemIcon>
              <Iconify icon='ant-design:export-outlined' sx={{width:28, height:28, color:'text.primary'}} />
            </ListItemIcon>
            로그인
          </MenuItem>
        )}
    </MenuList>
  );
}
