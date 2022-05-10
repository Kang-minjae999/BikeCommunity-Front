import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {  Link, Card, Avatar, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCard({ post }) {
  const { id, title, nicknameOfPost, createdDate, avatarImageURL, numOfComment} = post;

  const linkToProfile = `${PATH_DASHBOARD.user.profile}/${nicknameOfPost}`;
  const linktoPost = `/dashboard/garage/ask/${id}`;

  return (
    <Card>
      <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={0}>
        <Link to={linktoPost} color="inherit" component={RouterLink}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {title}
            </Typography> 
          </Link>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        <Link to={linkToProfile} color="inherit" component={RouterLink}>
          <Avatar
            alt={nicknameOfPost}
            src={avatarImageURL}
            sx={{ width: 32, height: 32, mt: 1, mb: 1, ml: 1, mr: 1 }}
          />
        </Link>
        <Link to={linkToProfile} color="action" component={RouterLink}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {nicknameOfPost}
          </Typography> 
          </Link>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {numOfComment} {createdDate}
        </Typography> 
        </Stack>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------
