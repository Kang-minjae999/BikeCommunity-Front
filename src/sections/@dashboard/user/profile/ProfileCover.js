import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// utils
import cssStyles from '../../../../utils/cssStyles';
// hooks
import useAuth from '../../../../hooks/useAuth';
// components
import MyAvatar from '../../../../components/MyAvatar';
import Image from '../../../../components/Image';

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
  myProfile: PropTypes.object,
};

export default function ProfileCover({ myProfile }) {
  const { user } = useAuth();

  const { position, cover } = myProfile;

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
            width: 80,
            height:80,
            mt:2,
          }}
        />
          <Typography variant="subtitle2" sx={{mt:2}}>{user?.name}강민순</Typography>
          {/* <Typography sx={{ opacity: 0.72 }}>{position}</Typography> */}
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
        <Typography variant="subtitle2" sx={{mt:2}}>{user?.name}게시글</Typography>
        <Typography variant="body2" >{user?.name}14</Typography>
        </Stack>
        </Box>

        <Box >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
        <Typography variant="subtitle2" sx={{mt:2}}>{user?.name}좋아요</Typography>
        <Typography variant="body2" >{user?.name}14</Typography>
        </Stack>
        </Box>
        <Box >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <FavoriteIcon color='error' sx={{mt:2}}/>
        </Stack>
        </Box>
        </Stack>
        </div>
   </Stack>
   </>
  );
}
