import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Card, Divider, Container, Typography, Pagination, Stack, Avatar } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axiospost';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../components/skeleton';
// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm,
  Blogfeature,
} from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogDingsta() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id = '' } = useParams();

  const [recentPosts, setRecentPosts] = useState([]);

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
      setError(error.message);
    }
  }, [isMountedRef, id]);

  /*   const getRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get('/posts', {
        params: { id },
      });

      if (isMountedRef.current) {
        setRecentPosts(response.data.recentPosts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, id]);
   useEffect(() => {
    getPost();
    getRecentPosts();
  }, [getRecentPosts, getPost]); */

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <Page title="포스트">
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
          <Avatar alt={post.id} src={post.avatarImageURL} sx={{ width: 48, height: 48, mt:1,mb:1,ml:1,mr:1 }} />
          <Typography variant="subtitle1" sx={{ color: 'common.black' }}>
            {post.nicknameOfPost}
          </Typography>
          </Stack>
          <MoreHorizIcon sx={{mr:1}}/>
          </Stack>
          <Blogfeature post={post}/>
          <Divider />
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="body2" sx={{ mb: 5 }}>
              {post.content}
            </Typography>
            <Box sx={{ my: 5 }}>
              <Divider />
              <BlogPostTags post={post} />
              <Divider />
            </Box>

            <Box sx={{ display: 'flex', mb: 2 }}>
              <Typography variant="h4">댓글</Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                ({post.comments.length})
              </Typography>
            </Box> 
          <Divider />

          {/*   <BlogPostCommentList post={post} />  */}

           <BlogPostCommentForm /> 
          </Box>
        </Card>
      )}

      {!post && !error && <SkeletonPost />}

      {error && <Typography variant="h6">404 {error}!</Typography>}

      {/*  <BlogPostRecent posts={recentPosts} /> */}

      </Container>
    </Page>
  );
}


