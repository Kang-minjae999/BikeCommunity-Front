import PropTypes from 'prop-types';
// @mui
import { Box, Chip, Checkbox, FormControlLabel } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

BlogPostTags.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default function BlogPostTags({ tags }) {
  return (
    <Box sx={{ py: 3 }}>
      {tags.map((tag, index) => (
        <Chip key={index} label={tag} sx={{ m: 0.5 }} />
      ))}

    {/*   <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(favorite)}
        />
      </Box> */}
    </Box>
  );
}
