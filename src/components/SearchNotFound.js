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
        <strong>&quot;{searchQuery}&quot;</strong>에 대한 내용을 검색할까요?
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2">검색하실 내용과 엔터를 눌러주세요.</Typography>
  );
}
