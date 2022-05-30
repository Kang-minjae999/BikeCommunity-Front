import { useEffect, useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Container, Stack, Pagination, Link, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axios';
// routes
// components
import Page from '../../components/Page';
import { SkeletonListItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogPostCard, BlogPostsSearch } from '../../sections/@dashboard/clublist';
import { PATH_DASHBOARD } from '../../routes/paths';


export default function ClubList() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [page, setpage] = useState(0);
  const [totalpage, settotalpage] = useState(0);
  const [pagenation, setpagenation] = useState(1);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/club-service/clubs?page=${page}&size=12`);

      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, page]);

  // ---------------------------------------------
  const [api, setapi] = useState('');
  const [param, setparam] = useState('');

  const getAllPosts2 = useCallback(async () => {
    try {
      const response = await axios.get(`/club-service/clubs/search?page=${page}&size=12&${api}=${param}`);
      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, page, api, param]);

  useEffect(() => {
    if (!param) {
      getAllPosts();
    }
    if (param) {
      getAllPosts2();
    }
  }, [getAllPosts, getAllPosts2, param]);

  // --------------------------------------------------------------

  const handleChange = useCallback(
    (event, value) => {
      setpagenation(value);
      setpage(value - 1);
      getAllPosts(page);
    },
    [getAllPosts, page]
  );

  return (
    <Page title="클럽 리스트">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="클럽 리스트"
          links={[{ name: '' }]}
          action={
            <Link    
              variant="outlined"
              component={RouterLink}
              to={PATH_DASHBOARD.blog.newDingsta}
              >
              <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={0}
              >
              <AddIcon sx={{ml:1, mr:1}} color='action'/>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  만들기
                </Typography> 
              </Stack>
              </Link>
          }
          sx={{mb:2}}
        />
        <BlogPostsSearch setparam={setparam} setapi={setapi} />

        <Grid container spacing={2}>
          {(!posts.length ? [...Array(12)] : posts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={6} sm={4} md={3}>
                <BlogPostCard post={post} />
              </Grid>
            ) : (
              <SkeletonListItem key={index} />
            )
          )}
        </Grid>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Pagination
            count={totalpage}
            page={pagenation}
            onChange={handleChange}
            shape="rounded"
            color="action"
            size="large"
            sx={{ mt: 2, mb: 4 }}
          />
        </Stack>
      </Container>
    </Page>
  );
}
