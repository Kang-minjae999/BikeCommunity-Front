import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch } from '../../../../redux/store';
import { addSearch } from '../../../../redux/slices/product';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import SearchNotFound from '../../../../components/SearchNotFound';
import useResponsive from '../../../../hooks/useResponsive';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '300px !important',
});

// ----------------------------------------------------------------------
ShopProductSearch.propTypes = {
  setparam: PropTypes.func.isRequired,
};

export default function ShopProductSearch({setparam}) {
  const dispatch = useDispatch();
  const {tab = ''} = useParams();
  const isDeskTop = useResponsive('up','lg')

  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = [];


  const handleChangeSearch = (value) => {
      setSearchQuery(value);
  };
  const handleClick = () => {

  }

  const goSearch = (searchQuery) => {
    if(!isDeskTop){
      if(tab !== 'etctrade'){
      navigate(`/dashboard/shop/used/biketrade/0/&title=${searchQuery}`)   
      } else {
      navigate(`/dashboard/shop/used/etctrade/0/&title=${searchQuery}`)   
      }
    }
    if(isDeskTop){
      if(tab !== 'etctrade'){
        navigate(`/dashboard/marketu/biketrade/0/&title=${searchQuery}`)   
        } else {
        navigate(`/dashboard/marketu/etctrade/0/&title=${searchQuery}`)   
        }
    }
  }


  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      goSearch(searchQuery)
      dispatch(addSearch(searchQuery))
      document.activeElement.blur()
    }
  };


  return (
    <Autocomplete
      closeText='close'
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(post) => post.title}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={isDeskTop ? 400 : '100%'}
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
