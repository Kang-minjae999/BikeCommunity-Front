import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// utils
import cssStyles from '../../../../utils/cssStyles';
// hooks
import useAuth from '../../../../hooks/useAuth';
// components
import MyAvatar from '../../../../components/MyAvatar';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  }
));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  nickname: PropTypes.string,
};

export default function ProfileCover({ nickname }) {
  const { user } = useAuth();
  const navigate = useNavigate()


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
    navigate('/dashboard/app')
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    navigate('/dashboard/blog/new-report')
  };

  return (
    <>
    <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
       <Box
          sx={{
            ml: 3,
            color: 'common.black',
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
        <MyAvatar
          sx={{
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'primary.main',
            width: 64,
            height:64,
            mt:2,
          }}
        />
        {nickname && <Typography variant="subtitle2" sx={{mt:2}}>{nickname}</Typography>}
        </Box>
        </Stack>
        <div>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{mr:5}}
          >

        <Box >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
        <Typography variant="subtitle2" sx={{mt:2}}>게시글</Typography>
        <Typography variant="body2" >141</Typography>
        </Stack>
        </Box>

        <Box >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
        <Typography variant="subtitle2" sx={{mt:2}}>{user?.name}판매글</Typography>
        <Typography variant="body2" >{user?.name}50</Typography>
        </Stack>
        </Box>
        <Box >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
        <Typography variant="subtitle2" sx={{mt:2}}>좋아요</Typography>
        <Typography variant="body2" >1645</Typography>
        </Stack>
        </Box>
        <Box >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <IconButton onClick={handleClick} sx={{mt:2}}>
            <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
          </IconButton>
          <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose1}>채팅하기</MenuItem>
          <MenuItem onClick={handleClose2}>신고하기</MenuItem>
        </Menu>
        </Stack>
        </Box>
        </Stack>
        </div>
   </Stack>
   </>
  );
}
