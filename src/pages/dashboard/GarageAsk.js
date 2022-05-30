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
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import { SkeletonPost } from '../../components/skeleton';
// sections
import {
  BlogPostCommentList,
} from '../../sections/@dashboard/garage/ask';
import DotdotdotPost from '../../components/DotdotdotPost';
import Markdown from '../../components/Markdown';
import { fToNow } from '../../utils/formatTime';

// ----------------------------------------------------------------------

export default function GarageAsk() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id = '' } = useParams();

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/garagepost-service/garageask/${id}`);

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
    <Page title="정비질문">
    <Container maxWidth={themeStretch ? false : 'md'}>
      {post && (
        <Card>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
            sx={{mt:1}}
          >
            <Typography variant="h4" sx={{ color: 'text.primary', m: 3 }}>
             {post.title}
            </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            sx={{mb:1}}
          >
          <Typography variant="body2" sx={{ color: 'text.primary', m:2 }}>
          {post.address}/{post.modelName}
          </Typography>
          <Typography  variant="body2" sx={{ color: 'text.disabled', m:2 }}>
          {fToNow(post.createdDate)}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
          <Link to={linkToProfile} color="inherit" component={RouterLink}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
          <Avatar alt={post.avatarImageURL} src={post.avatarImageURL} sx={{ width: 32, height: 32, mt:1,mb:1,ml:1,mr:1 }} />
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
            {post.nicknameOfPost}
          </Typography>
          </Stack>
          </Link>
          <DotdotdotPost nicknameOfPost={post.nicknameOfPost} />
           </Stack>
          </Stack>
          </Stack>
          <Divider />
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Markdown >
              {post.content}
            </Markdown>
          <Divider sx={{ my: 5 }} />
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Typography variant="subtitle2">댓글</Typography>
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
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


