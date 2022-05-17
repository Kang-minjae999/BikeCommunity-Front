import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Divider, Container, Typography, Stack, Avatar,Link } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { SkeletonPost } from '../../components/skeleton';
// sections
import {
  BlogPostTags,
  BlogPostCommentList,
  Blogfeature,
} from '../../sections/@dashboard/blog';
import DotdotdotPost from '../../components/DotdotdotPost';

// ----------------------------------------------------------------------
BlogDingstaForStas.propTypes = {
  postClick: PropTypes.object,
  error: PropTypes.string,
};

export default function BlogDingstaForStas({postClick ,error}) {
  const { themeStretch } = useSettings();

  const [post, setPost] = useState(null);

  useEffect(() => {
    if(postClick){
      setPost(postClick);
    }
  }, [postClick]);

  const linkToProfile = `${PATH_DASHBOARD.user.profile}/${post?.nicknameOfPost}`;
  
  return (
    <Page title="딩스타그램">
    <Container maxWidth={themeStretch ? false : 'md'} disableGutters>

      {post && (
        <Card>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0}
          >
          <Link to={linkToProfile} color="inherit" component={RouterLink}>
          <Avatar alt={post.avatarImageURL} src={post.avatarImageURL} sx={{ width: 32, height: 32, mt:1,mb:1,ml:1,mr:1 }} />
          </Link>
          <Link to={linkToProfile} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {post.nicknameOfPost}
          </Typography>
          </Link>
          </Stack>
          <DotdotdotPost nicknameOfPost={post.nicknameOfPost} />
          </Stack>
          <Divider />
          <Blogfeature post={post}/>
          <Divider />
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {post.content}
            </Typography>
              <BlogPostTags tags={post.tags} />
              <Divider />
            <Box sx={{ display: 'flex', my: 1 }}>
              <Typography variant="subtitle2">댓글</Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                ({post.numOfComment})
              </Typography>
            </Box> 

          <BlogPostCommentList post={post} />  

          </Box>
        </Card>
      )}

      {!post && !error && <SkeletonPost />}

      {error && <Typography variant="h6">404 {error}!</Typography>}

      </Container>
    </Page>
  );
}


