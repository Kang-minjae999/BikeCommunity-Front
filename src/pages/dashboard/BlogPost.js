import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Card, Divider, Container, Typography, Pagination } from '@mui/material';
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
} from '../../sections/@dashboard/blogpost';

// ----------------------------------------------------------------------

export default function BlogPost() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id = '' } = useParams();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/posts/${id}`);

      if (isMountedRef.current) {
        setPost(response.data.post);
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
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: '' },
          ]}
          sx={{mt:2}}
        />

        {post && (
          <Card>
              <BlogPostHero post={post} />
                <Divider/>
              <Box sx={{ p: { xs: 3, md: 5 }}}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.content} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Box>

              <BlogPostCommentList post={post} />

          {/*  <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box> */}

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
