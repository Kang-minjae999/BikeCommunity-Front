import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import Image from '../../../components/Image';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(2),
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
  product: PropTypes.object.isRequired,
};

export default function ProfileCover({ product }) {
  const { name } = product

  return (
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
      <Typography variant="h4">&nbsp;{name}&nbsp;</Typography> 
        </Box> 
      </InfoStyle>
      <Image alt="profile cover" src='https://file.philgo.com/data/upload/9/2107609' ratio='21/9' sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
    </RootStyle>
  );
}
