import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper, Stack, Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
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


export default function BlogPostsSearch() {
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
      navigate(`/dashboard/garages/ask/${value}=${searchQuery}`)
      document.activeElement.blur()
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const [value, setvalue] = useState('title')

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setvalue('title')
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    setvalue('model')
  };
  const handleClose3 = () => {
    setAnchorEl(null);
    setvalue('nickname')
  };
  const [label, setlabel] = useState('??????')

  useEffect(() => {
    if(value === 'title'){
      setlabel('??????')
    }
    if(value === 'model'){
      setlabel('?????????')
    }
    if(value === 'nickname'){
      setlabel('?????????')
    }
    
  }, [value])
  


  return (
    <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={1}
    sx={{mb:1}}
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickButton}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
          >
        <SearchIcon color='action'/>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {label}
        </Typography>
        </Stack>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        color='action'
      >
        <MenuItem onClick={handleClose}>??????</MenuItem>
        <MenuItem onClick={handleClose2}>?????????</MenuItem>
        <MenuItem onClick={handleClose3}>?????????</MenuItem>
      </Menu>
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
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={isDeskTop ? 400 : 320}
          placeholder="????????????"
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
          <Typography>{inputValue}??? ????????????</Typography>
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
    <Link    
    variant="outlined"
    component={RouterLink}
    to='/dashboard/garage/new-ask'
    >
    <Stack
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={0}
    >
    <AddIcon sx={{ml:1, mr:1}} color='action'/>
    <Typography variant="body2" sx={{ color: 'text.primary' }}>
    ??????
    </Typography> 
    </Stack>
    </Link>
    </Stack>
  );
}
