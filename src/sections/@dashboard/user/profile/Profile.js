import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
  post: PropTypes.array,
};

export default function Profile({ post }) {
  return (
    <Grid container spacing={3}>
{/*       <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid> */}

      <Grid item xs={12} md={12}>
        {post && <Stack spacing={3}>
         {/*  <ProfilePostInput /> */}
         {post.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
         {/*  {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))} */}
        </Stack>}
      </Grid>
    </Grid>
  );
}
