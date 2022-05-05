import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Box, Card, Divider, Container, Typography, Stack, Avatar,Link } from '@mui/material';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import axios from '../../utils/axiospost';
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

export default function GaragePost() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id = '' } = useParams();

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta/${id}`);

      if (isMountedRef.current) {
        setPost(response.data.data);
      }
    } catch (error) {
      console.error(error);
      setError('서버와의 연결이 이상해요!');
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const linkToProfile = `${PATH_DASHBOARD.user.profile}/${post?.nicknameOfPost}`;
  
  return (
    <Page title="딩스타그램">
    <Container maxWidth={themeStretch ? false : 'md'}>

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
          <Avatar alt={post.avatarImageURL} src={post.avatarImageURL} sx={{ width: 48, height: 48, mt:1,mb:1,ml:1,mr:1 }} />
          </Link>
          <Link to={linkToProfile} color="text.primary" component={RouterLink}>
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            {post.nicknameOfPost}
          </Typography>
          </Link>
          </Stack>
          <DotdotdotPost nicknameOfPost={post.nicknameOfPost} />
          </Stack>
          <Blogfeature post={post}/>
          <Divider />
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="body2" sx={{ mb: 5 }}>
              {post.content}
            </Typography>
            <Box sx={{ my: 5 }}>
              <Divider />
              <BlogPostTags tags={post.tags} />
              <Divider />
            </Box>

            <Box sx={{ display: 'flex', mb: 2 }}>
              <Typography variant="h4">댓글</Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                ({post.numOfComment})
              </Typography>
            </Box> 
          <Divider />

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


