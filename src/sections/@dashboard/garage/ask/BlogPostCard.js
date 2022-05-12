import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {  Link, Card, Avatar, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { fToNow } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCard({ post }) {
  const { id, title, modelName, address, nicknameOfPost, createdDate, avatarImageURL, numOfComment} = post;

  const linkToProfile = `${PATH_DASHBOARD.user.profile}/${nicknameOfPost}`;
  const linktoPost = `/dashboard/garage/ask/${id}`;

  return (
    <Card>
      <Stack direction="column" justifyContent="space-between" spacing={0} sx={{m:2}}>
        <Link to={linktoPost} color="inherit" component={RouterLink} sx={{mx:1, my:3 }}>
      <Stack direction="row" justifyContent="flex-start" alignItems='center' spacing={0}>
        <Typography variant="subtitle1" sx={{ color: 'text.primary' }} line={2} persistent='true'>
              {title}           
        </Typography> 
        <Typography variant="body2" sx={{color:'text.disabled'}}>
              [{numOfComment}]
        </Typography> 
        </Stack>
          </Link>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
        <Link to={linkToProfile} color="inherit" component={RouterLink}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
          <Avatar
            alt={nicknameOfPost}
            src={avatarImageURL}
            sx={{ width: 32, height: 32, mt: 1, mb: 1, ml: 1, mr: 1 }}
          />
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {nicknameOfPost}
          </Typography> 
          </Stack>
          </Link>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {address}/{modelName}
          </Typography> 
        <Typography variant="body2" sx={{color:'text.disabled'}}>
        {fToNow(createdDate)}
        </Typography> 
        </Stack>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------
