import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfilePostCard from './ProfilePostCard';

// ----------------------------------------------------------------------

Profile.propTypes = {
  post: PropTypes.array,
};

export default function Profile({ post }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        {post && 
        <Stack spacing={3}>
         {post.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>}
      </Grid>
    </Grid>
  );
}
