import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Card, Avatar, Typography, Stack, Divider, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCard({ post }) {
  const { address, nicknameOfPost, avatarImageURL} = post;

  const linkToProfile = `${PATH_DASHBOARD.user.profile}/${nicknameOfPost}`;

  return (
    <>
    <Card>
        <Link to={linkToProfile} color="inherit" component={RouterLink} underline='none'>
      <Stack direction="row" justifyContent="space-between" alignItems="center" >
          <Avatar
            variant="rounded"
            alt={nicknameOfPost}
            src={avatarImageURL}
            sx={{ width: 60, height: 60, mt: 1, mb: 1, ml: 1, mr: 1 }}
          /> 
        <Stack direction="column" justifyContent="center" alignItems="center" >
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {nicknameOfPost}
          </Typography> 
          <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
            {address}
        </Typography> 
      </Stack>
      <Box>
          {''}
       </Box>
      </Stack>
        </Link>  
    </Card>
   </>
  );
}
