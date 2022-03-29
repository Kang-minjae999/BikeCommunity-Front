import orderBy from 'lodash/orderBy';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Pagination } from '@mui/material';
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
import { SkeletonboardItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogPostlist, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blognotice';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
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

export default function Blogreports() {
  const { themeStretch } = useSettings();

  const { user } = useAuth() 

  const isMountedRef = useIsMountedRef();

  const [page, setpage] = useState(0);
  const [totalpage, settotalpage] = useState(0);
  const [pagenation, setpagenation] = useState(1);

  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/notices?page=${page}&size=12`);

      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, page]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

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
      if(user?.role === 'admin'){
        setadmin(true)
      }
    } else{
    setadmin(false)
    }
  
  }, [user])
  


  return (
    <Page title="공지사항">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="Notice"
          links={[
            { name: '' },
          ]}
            action={
            (admin) && <Button
              variant="outlined"
              component={RouterLink}
              to={PATH_DASHBOARD.blog.newPost}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              글쓰기
            </Button>
          } 
        sx={{mt:2}}
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <Grid container spacing={1}>
        {(!posts.length ? [...Array(12)] 
            : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={12} md={12}>
                <BlogPostlist post={post}/>
              </Grid>
            ) : (
              <SkeletonboardItem key={index} />
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
