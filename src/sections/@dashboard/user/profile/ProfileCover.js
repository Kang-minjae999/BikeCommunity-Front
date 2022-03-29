import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, Menu, MenuItem, Stack, Typography, Avatar } from '@mui/material';
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

/* const RootStyle = styled('div')(() => ({
    top: 0,
    width: '100%',
    height: '100%',
    position: 'relative',
  }
));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'relative',
  marginTop: theme.spacing(0),
  backgroundColor:'white',
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));
 */
const RootStyle = styled('div')(() => ({
  top: 0,
  zIndex: 3,
  width: '100%',
  height: '100%',
  position: 'relative',
}));

const InfoStyle = styled('div')(({ theme }) => ({
left: 6,
zIndex: 99,
position: 'absolute',
[theme.breakpoints.up('md')]: {
  right: 'auto',
  display: 'flex',
  alignItems: 'center',
  marginTop: 24,
  left: theme.spacing(3),
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
  <Box>
  <RootStyle>
    <InfoStyle>
      <Box
        sx={{
          ml: { md: 3 },
          mt: { xs: 1, md: 0 },
          color: 'common.white',
          backgroundColor: 'primary.main',
          borderRadius:1,
          textAlign: { xs: 'center', md: 'center' },
        }}
      >
        <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Avatar sx={{width:84,height:84}} alt='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3aSF7SOFHZyZhHSOd9voAYmtGJdo-Yq2Vc_fzdL3CYYikNaVPkIiaOg_pEsEXzPru-U&usqp=CAU'/>
        <Typography variant="h4">&nbsp;일론머스크&nbsp;</Typography> 
        </Stack>
      </Box> 
    </InfoStyle>
    <Image alt="profile cover" src='https://file.philgo.com/data/upload/9/2107609' ratio='16/9' sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
  </RootStyle>
  </Box>
/* <>
    <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{mb:2}}
      >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Card
          sx={{
              ml: 3,
              color: 'common.black',
              alignContent:'center',
              alignItems:'center'
            }}
          >
          <MyAvatar
            sx={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'primary.main',
              width:64,
              height:64,
              mt:2,
            }}
          />
        </Card>
        <Box>
          {nickname && <Typography variant="subtitle2">{nickname}</Typography>}
        </Box>
      </Stack>
      <div>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{mr:2}}
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
              }}>
              <MenuItem onClick={handleClose1}>채팅하기</MenuItem>
              <MenuItem onClick={handleClose2}>신고하기</MenuItem>
            </Menu>
          </Stack>
        </Box>
        </Stack>
      </div>
   </Stack>
   </> */
  );
}
