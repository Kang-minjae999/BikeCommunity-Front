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
} from '../../sections/@dashboard/blognotice';

// ----------------------------------------------------------------------

export default function BlogPost() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id = '' } = useParams();


  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/notices/${id}`);

      if (isMountedRef.current) {
        setPost(response.data.data);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <Page title="공지사항">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="공지사항"
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
              <Box sx={{ my: 5 }}>
                <Divider />
              </Box>
            </Box>
          </Card>
        )}
        {!post && !error && <SkeletonPost />}
        {error && <Typography variant="h6">404 {error}!</Typography>}
      </Container>
    </Page>
  );
}
