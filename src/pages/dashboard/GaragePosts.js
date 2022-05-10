import { useEffect, useCallback, useState } from 'react';
import {useParams} from 'react-router-dom'
// @mui
import { Grid, Container, Stack, Pagination } from '@mui/material';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axiospost';
// routes
// components
import Page from '../../components/Page';
import { SkeletonGarageAsk } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogPostCard, BlogPostsSearch } from '../../sections/@dashboard/garage/post';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

export default function GarageAsks() {
  const isDesktop = useResponsive('up', 'lg')

  const isMountedRef = useIsMountedRef();

  const {params} = useParams();

  const [posts, setPosts] = useState([]);

  const [page, setpage] = useState(0);
  const [totalpage, settotalpage] = useState(0);
  const [pagenation, setpagenation] = useState(1);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/garageask?page=${page}&size=12`);

      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, page]);

  // ---------------------------------------------

  const getAllPosts2 = useCallback(async () => {
    try {
      const response = await axios.get(`/garageask/search?page=${page}&size=12&${params}`);
      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, page, params]);

  useEffect(() => {
    if (!params) {
      getAllPosts();
    }
    if (params) {
      getAllPosts2();
    }
  }, [getAllPosts, getAllPosts2, params]);

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
    <Page title="GARAGE">
      <Container maxWidth='xl' sx={{mt:2}}>
        {isDesktop && 
        <HeaderBreadcrumbs
          heading="정비 질문"
          links={[{ name: '' }]}
          action={
            <>
            </>
          }
          sx={{ mt: 2 }}
        />}
        <BlogPostsSearch  />

        <Grid container spacing={3}>
          {(!posts.length ? [...Array(12)] : posts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={3}>
                <BlogPostCard post={post} />
              </Grid>
            ) : (
              <SkeletonGarageAsk key={index} />
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
            sx={{ mt: 2 ,mb:4}}
          />
        </Stack>
      </Container>
    </Page>
  );
}
