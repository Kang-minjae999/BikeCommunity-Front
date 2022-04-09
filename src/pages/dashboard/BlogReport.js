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
import  Image from '../../components/Image';
import { fyeardateTime } from '../../utils/formatTime';
// sections
import {
  BlogPostHero,
} from '../../sections/@dashboard/blogpost';

// ----------------------------------------------------------------------

export default function BlogReport() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id = '' } = useParams();

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/report/${id}`);
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

  console.log(post)
  return (
    <Page title="신고/문의/건의">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="신고/문의/건의"
          links={[
            { name: '' },
          ]}
          sx={{mt:2}}
        />

        {post && (
          <Card>
          <Typography sx={{m:2}} variant='h6'>{post?.title}</Typography>
                <Divider />
            <Typography sx={{m:2}}>{post?.nicknameOfPost}/{fyeardateTime(post.createdDate)}</Typography>
                <Divider />
              <Box sx={{ p: { xs: 3, md: 5 }}}>
              <Typography variant="body2" sx={{ m:2 }}>
               {post.content}
              </Typography> 
              <Box sx={{ my: 5 }}>
                <Divider />
              {post.postImageURLs.map((e, index)=><Box key={index}> <Image alt={index} src={e}/> </Box>)}
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
