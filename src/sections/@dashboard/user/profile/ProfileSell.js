import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Image from '../../../../components/Image';


// ----------------------------------------------------------------------

ProfileSell.propTypes = {
  post: PropTypes.array,
};

export default function ProfileSell({ post }) {

  return (
    <Box sx={{ mt: 1 }}>
       {post &&  <Card sx={{ p: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: {
              xs: 'repeat(3, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {post.map((post) => (
            <GalleryItem key={post.id} post={post}/>
          ))}
        </Box>
      </Card>}
    </Box>
  );
}

// ----------------------------------------------------------------------

GalleryItem.propTypes = {
  post: PropTypes.object,
};

function GalleryItem({ post }) {
  const linkTo = `${PATH_DASHBOARD.blog.root}/dingsta/${post.id}`;

  return (
    <>
    {post && <Card sx={{ cursor: 'pointer', position: 'relative' }}> 
      <Link to={linkTo} color="inherit" component={RouterLink}>
        <Image alt="gallery image" ratio="1/1" src={post?.thumbnailImageUrl} />
      </Link>
    </Card>}
    </>
  );
}
