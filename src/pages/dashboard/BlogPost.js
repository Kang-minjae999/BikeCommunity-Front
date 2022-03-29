import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Card, Divider, Container, Typography, Pagination } from '@mui/material';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axiospostadmin';
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
import Image from '../../components/Image';

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
              <Typography variant="body2" sx={{ mb: 5 }}>
               {post.content}
              </Typography> 
              <Divider sx={{mb:2}}/>
                {post?.imageURLs.map((file,index)=>(<Image ratio='16/9' key={file} alt={index} src={file}/>))} 
              <Box sx={{ my: 5 }}>
                <Divider />
              </Box>
            </Box>
          </Card>
        )}

        {!post && !error && <SkeletonPost />}

        {error && <Typography variant="h6">{error}!</Typography>}

       {/*  <BlogPostRecent posts={recentPosts} /> */}
      </Container>
    </Page>
  );
}
