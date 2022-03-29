import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
// utils
import { fyeardateTime } from '../../../../utils/formatTime';
// components
import Image from '../../../../components/Image';
import DotdotdotPost from '../../../../components/DotdotdotPost';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
  post: PropTypes.object,
};

export default function ProfilePostCard({ post }) {
  const linkTo = `${PATH_DASHBOARD.blog.root}/dingsta/${post.id}`;



  return (
<Card>
<CardHeader
  disableTypography
  avatar={<Avatar alt='avatar' src={post?.avatarImageURL}/>} 
  title={
    <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
      {post?.nicknameOfPost}
    </Link>
  }
  subheader={
    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
      {fyeardateTime(post?.createdDate)}
    </Typography>
  }
  action={<><DotdotdotPost nicknameOfPost={post?.nicknameOfPost}/>
  </>
  }
/>

<Stack spacing={3} sx={{ p: 3 }}>
  <Link to={linkTo} color="inherit" component={RouterLink}>
  <Typography>{post?.content}</Typography>

  <Image alt="post media" src={post?.thumbnailImageUrl} ratio="16/9" sx={{ borderRadius: 1 }} />
  </Link>
</Stack>
</Card>
  );
}