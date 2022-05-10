import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Card, Avatar, Typography, Stack, Divider } from '@mui/material';
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
        <Link to={linkToProfile} color="inherit" component={RouterLink} underline='none'>
          <Avatar
            variant="rounded"
            alt={nicknameOfPost}
            src={avatarImageURL}
            sx={{ width: 120, height: 120, mt: 1, mb: 1, ml: 1, mr: 1 }}
          />
        </Link>    
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={0}>
        <Link to={linkToProfile} color="action" component={RouterLink} underline='none'>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {nicknameOfPost}
          </Typography> 
        </Link>
        <Link to={linkToProfile} color="action" component={RouterLink} underline='none'>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {address}
          </Typography> 
          </Link>
        </Stack>
      </Stack>
    </Card>
   </>
  );
}
