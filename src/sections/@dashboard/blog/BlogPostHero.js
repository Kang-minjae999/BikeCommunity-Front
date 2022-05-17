import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Avatar, Typography } from '@mui/material';
// components
import Image from '../../../components/Image';

// ----------------------------------------------------------------------


const OverlayStyle = styled('h1')(() => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
}));


const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

BlogPostHero.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostHero({ post }) {
  const { nicknameOfPost, postImageURLs, avatarImageURL } = post;

  return (
    <Box sx={{ position: 'relative' }}>
      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={nicknameOfPost} src={avatarImageURL} sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {nicknameOfPost}
            </Typography>
            {/*    <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {fDate(createdAt)}
            </Typography> */}
          </Box>
        </Box>
      </FooterStyle>

      <OverlayStyle />
      <Image alt="post cover" src={postImageURLs[0]} ratio="1/1" />
    </Box>
  );
}
