import PropTypes from 'prop-types';
import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';
// hooks
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { allPositions } from "../../../../pages/dashboard/GeneralMapposition"
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import SearchNotFound from '../../../../components/SearchNotFound';
import useResponsive from '../../../../hooks/useResponsive';

// ----------------------------------------------------------------------
AppRidingMapSearch.propTypes = {
  setPosition: PropTypes.func.isRequired,
};

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

export default function AppRidingMapSearch({setPosition}) {
  const [searchQuery, setSearchQuery] = useState('');


  const handleClick = (product) => {
    setPosition(product);
  };


  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={allPositions}
      getOptionLabel={(product) => product.name}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart='100%'
          sx={{mb:2}}
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
      renderOption={(props, product, { inputValue }) => {
        const { name } = product;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);
 
        return (
          <Link underline="none"  onClick={() => handleClick(product)} key={product.name}>
          <li {...props}>
           {/*  <Image alt={cover} src={cover} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} /> */}
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant={part.highlight ? 'subtitle2' : 'body2'}
                  color='textPrimary'
                >
                  {part.text}
                </Typography>
              ))}
          </li>
          </Link>
        );
      }}
    />
  );
}
