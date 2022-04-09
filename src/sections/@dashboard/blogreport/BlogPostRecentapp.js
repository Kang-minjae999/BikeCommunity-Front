import PropTypes from 'prop-types';
// @mui
import { Grid, Typography, Stack } from '@mui/material';
//
import BlogPostCardapp from './BlogPostCardapp';

// ----------------------------------------------------------------------

BlogPostRecentapp.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function BlogPostRecentapp({ posts }) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 2,ml:2 ,mb: 2 }}>
        다른 포스트
      </Typography>
        {posts.map((post) => (
            <BlogPostCardapp post={post} key={post.id}/>
        ))}
    </>
  );
}
