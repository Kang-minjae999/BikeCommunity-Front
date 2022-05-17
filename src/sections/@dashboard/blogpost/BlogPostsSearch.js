import PropTypes from 'prop-types';
import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper} from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import SearchNotFound from '../../../components/SearchNotFound';
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '300px !important',
});

// ----------------------------------------------------------------------
BlogPostsSearch.propTypes = {
  setparam: PropTypes.func.isRequired,
};

export default function BlogPostsSearch({setparam }) {
  const navigate = useNavigate();

  const isDeskTop = useResponsive('up','lg')

  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = [];

  const handleChangeSearch = (value) => {
      setSearchQuery(value);
  };


  const handleClick = (title) => {
    navigate(`${PATH_DASHBOARD.blog.root}/dingstas/${paramCase(title)}`);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      setparam(searchQuery)
      document.activeElement.blur()
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(post) => post.title}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      sx={{mb:5}}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={isDeskTop ? 400 : '100%'}
          placeholder="검색하기"
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const { title, cover } = post;
        const matches = match(title, inputValue);
        const parts = parse(title, matches);

        return (
          <>
          <Typography>{inputValue}로 검색하기</Typography>
          <li {...props}>
            <Image alt={cover} src={cover} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} />
            <Link underline="none" onClick={() => handleClick(title)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
          </>
        );
      }}
    />
  );
}
