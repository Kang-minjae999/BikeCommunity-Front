import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, List, Stack, Divider, MenuItem, Typography } from '@mui/material';
// auth
import useAuth from '../../../hooks/useAuth';
// components
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';

// -----------------------------------------------------

export default function ChatAccount() {
  const { user } = useAuth();

  const [open, setOpen] = useState(null);

  const navigate = useNavigate()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };
/*   const onClick1 = () =>{
    navigate(`/dashboard/user/profile/${user.id}`)
  } */
  const onClick1 = () =>{
    navigate(`/dashboard/user/profile/1`)
  }
  const onClick2 = () =>{
    navigate('/dashboard/user/account')
  }
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 2, pr: 1, pl: 2.5 }}>
        <div>
          <MyAvatar onClick={handleOpen} sx={{ cursor: 'pointer', width: 48, height: 48 }} />
         {/*  <BadgeStatus status={status} sx={{ position: 'absolute', bottom: 2, right: 2 }} /> */}
        </div>
          <div>
            <Typography noWrap variant="subtitle1">
              {/* {user?.nickName} */} 일론머스크
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
               {user?.email} 
            </Typography>
          </div>
        </Stack>
      </Box>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        arrow="left-top"
        sx={{ p: 0, ml: 0.5, width: 'auto' }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 2, pr: 1, pl: 2.5 }}>
          <div>
            <Typography noWrap variant="subtitle1">
              {user?.nickName} 일론머스크
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </div>
        </Stack>

        <Divider />

        <List
          sx={{
            px: 1,
            '& .MuiMenuItem-root': {
              py: 1,
              px: 2,
              typography: 'body2',
              borderRadius: 0.75,
            },
          }}
        >
          <MenuItem onClick={onClick1}>
            <Iconify icon="ic:round-account-box" sx={{ ...ICON }} />
            프로필
          </MenuItem>

          <MenuItem onClick={onClick2} >
            <Iconify icon="eva:settings-2-fill" sx={{ ...ICON }} />
            설정
          </MenuItem>
        </List>
      </MenuPopover>
    </>
  );
}
