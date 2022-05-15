import orderBy from 'lodash/orderBy';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Pagination } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axiospostadmin';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { SkeletonPostItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blogpost';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: '최신' },
  { value: 'popular', label: '인기' },
  { value: 'oldest', label: '과거' },
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

export default function BlogPosts() {
  const { user } = useAuth()
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  const [page, setpage] = useState(0);
  const [totalpage, settotalpage] = useState(0);
  const [pagenation, setpagenation] = useState(1);

  const sortedPosts = applySort(posts, filters);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/posts?page=${page}&size=12`);

      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef,page]);

  const [param, setparam] = useState('');

  const getAllPosts2 = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta/search?page=${page}&size=12&title=${param}`);
      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, page, param]);

  useEffect(() => {
    if (!param) {
      getAllPosts();
    }
    if (param) {
      getAllPosts2();
    }
  }, [getAllPosts, getAllPosts2, param]);

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

  const [admin , setadmin] = useState(false)

  useEffect(() => {
    if(user){
      if(user?.role === 'ROLE_ADMIN_L1'){
        setadmin(true)
      }
      if(user?.role === 'ROLE_ADMIN_L2'){
        setadmin(true)
      }
    } else{
    setadmin(false)
    }
  
  }, [user])

  return (
    <Page title="포스트">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="포스트"
          links={[
            { name: ''},
          ]}
             action={ <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} /> }   
        />
          <BlogPostsSearch setparam={setparam}/>
            {admin && <Button
              variant="outlined"
              component={RouterLink}
              to={PATH_DASHBOARD.blog.newPost}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              글쓰기
            </Button>}
        <Grid container spacing={3}>
          {(!posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={3}>
                <BlogPostCard post={post} index={index} />
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
        <Pagination count={totalpage} page={pagenation} onChange={handleChange} shape="rounded" color="action" size="large" sx={{mt:2}}/>
        </Stack>
      </Container>
    </Page>
  );
}
