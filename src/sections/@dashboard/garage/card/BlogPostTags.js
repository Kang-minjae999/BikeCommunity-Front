import PropTypes from 'prop-types';
// @mui
import { Box, Chip } from '@mui/material';

// ----------------------------------------------------------------------

BlogPostTags.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default function BlogPostTags({ tags }) {
  return (
    <Box >
      {tags.map((tag, index) => (
        <Chip key={index} label={tag} sx={{ mr: 0.5, mb:2 }} />
      ))}
    </Box>
  );
}
