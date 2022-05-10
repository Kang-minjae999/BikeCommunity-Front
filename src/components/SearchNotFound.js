import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography variant="body2" align="center">
        <strong>&quot;{searchQuery}&quot;</strong>를 검색할까요?
      </Typography>
    </Paper>
  ) : (
    '자유롭게 입력해주세요!'
  );
}
