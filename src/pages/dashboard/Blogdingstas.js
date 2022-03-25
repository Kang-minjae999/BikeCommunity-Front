import orderBy from 'lodash/orderBy';
import { Link as RouterLink,useLocation } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Pagination, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axiospost';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';

import Iconify from '../../components/Iconify';
import { SkeletonPostItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogPostCard, BlogPostsSort, BlogPostsSearch, BlogPostsSearchbar, BlogPostSearchsort } from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: '최신' },
  { value: 'popular', label: '인기' },
  { value: 'oldest', label: '과거' },
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdDate'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdDate'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

export default function Blogdingstas() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [page, setpage] = useState(0);
  const [totalpage, settotalpage] = useState(0);
  const [pagenation, setpagenation] = useState(1);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta?page=${page}&size=12`);

      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef,page]);

  // ---------------------------------------------
  const [api, setapi] = useState('');
  const [param, setparam] = useState('')

  const getAllPosts2 = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta/search?page=${page}&size=12&${api}=${param}`);
      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef,page,api,param]);

  useEffect(() => {
    if(!param){
      getAllPosts();
    }
    if(param){
      getAllPosts2();
    }
  }, [getAllPosts,getAllPosts2,param]);

  // --------------------------------------------------------------

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  const handleChange = useCallback(
    (event, value) => {
      setpagenation(value);
      setpage(value - 1);
      getAllPosts(page);
    },
    [getAllPosts, page]
  );

  console.log(posts)
  return (
    <Page title="Posts">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="Dingsta"
          links={[{ name: '' }]}
          action={
            <>
            <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />  
            </>
          }
          sx={{ mt: 2 }}
        />
        <BlogPostsSearch setparam={setparam} setapi={setapi}/> 


        <Grid container spacing={3} >
          {(!posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={3}>
                <BlogPostCard post={post} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          >
        <Pagination count={totalpage} page={pagenation} onChange={handleChange} shape="rounded" color="primary" size="large" sx={{mt:2}}/>
        </Stack>
      </Container>
    </Page>
  );
}
