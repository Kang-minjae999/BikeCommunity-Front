import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper, Stack, Button, Menu, MenuItem } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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

// ----------------------------------------------------------------------

export default function BlogPostsSearchCustom() {
  const navigate = useNavigate();

  const { params } = useParams()

  const isDeskTop = useResponsive('up','lg')

  const [searchQuery, setSearchQuery] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const [value, setvalue] = useState('title')

  const searchResults = [];

  const handleChangeSearch = (value) => {
      setSearchQuery(value);
  };


  const handleClick = (title) => {
    navigate(`${PATH_DASHBOARD.blog.root}/dingstas/${paramCase(title)}`);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      navigate(`/dashboard/garages/custom/${value}=${searchQuery}`)
      document.activeElement.blur()
    }
  };

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setvalue('title')
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    setvalue('address')
  };
  const [label, setlabel] = useState('이름')

  useEffect(() => {
    if(value === 'content'){
      setlabel('이름')
    }
    if(value === 'address'){
      setlabel('지역')
    } 
  }, [value])
  


  return (
    <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={2}
    sx={{mb:1, width:'100%'}}
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
        <MenuItem onClick={handleClose}>이름</MenuItem>
        <MenuItem onClick={handleClose2}>지역</MenuItem>
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
    {params && 
    <>
    <RestartAltIcon onClick={() => navigate('/dashboard/motocycle/maintenance/custom')}/>
    </>
    }
    </Stack>
  );
}
