import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH, PATH_PAGE } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import MyAvatar from '../../../components/MyAvatar';
import SettingMode from '../../../components/settings/SettingMode';


// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_AUTH.login, { replace: true });

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('로그아웃 할 수가 없어요!', { variant: 'error' });
    }
  };

  const handleLogin = async () => {
    try {
      navigate(PATH_AUTH.login, { replace: true });

      if (isMountedRef.current) {
        handleClose();
      }
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
  },
  {
    label: '설정',
    linkTo: '/dashboard/mypage',
  },
  {
    label: '공지사항',
    linkTo: PATH_DASHBOARD.blog.notices,
  },
  {
    label: '고객센터',
    linkTo: PATH_PAGE.faqs,
  },
];

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
       <MyAvatar sx={{width:36, height:36}}/>
     {/*   {!user && <PersonIcon color="text.primary" />} */}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        {user && (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {user?.nickname}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {user?.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <MenuItem >
          <SettingMode />
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        {user && (
          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            로그아웃
          </MenuItem>
        )}

        {!user && (
          <MenuItem onClick={handleLogin} sx={{ m: 1 }}>
            로그인
          </MenuItem>
        )}
      </MenuPopover>
    </>
  );
}
