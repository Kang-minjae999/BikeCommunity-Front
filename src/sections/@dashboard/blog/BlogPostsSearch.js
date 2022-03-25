import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper, Box, Stack, Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import axios from '../../../utils/axios';
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

export default function BlogPostsSearch({setparam , setapi}) {
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const isDeskTop = useResponsive('up','lg')

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

/*   const handleChangeSearch = async (value) => {
    try {
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/api/blog/posts/search', {
          params: { query: value },
        });

        if (isMountedRef.current) {
          setSearchResults(response.data.results);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }; */

  const handleChangeSearch = (value) => {
      setSearchQuery(value);
  };


  const handleClick = (title) => {
    navigate(`${PATH_DASHBOARD.blog.root}/dingstas/${paramCase(title)}`);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      setparam(searchQuery)
      setapi(value)
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const [value, setvalue] = useState('content')

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setvalue('content')
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    setvalue('tag')
  };
  const handleClose3 = () => {
    setAnchorEl(null);
    setvalue('nickname')
  };
  const [label, setlabel] = useState('내용')

  useEffect(() => {
    if(value === 'content'){
      setlabel('내용')
    }
    if(value === 'tag'){
      setlabel('태그')
    }
    if(value === 'nickname'){
      setlabel('닉네임')
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
        <SearchIcon/>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
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
      >
        <MenuItem onClick={handleClose}>내용</MenuItem>
        <MenuItem onClick={handleClose2}>태그</MenuItem>
        <MenuItem onClick={handleClose3}>작성자</MenuItem>
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
          stretchStart={isDeskTop ? 400 : 250}
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
    <Link    
    variant="outlined"
    component={RouterLink}
    to={PATH_DASHBOARD.blog.newDingsta}
    >
    <Stack
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={0}
    >
    <AddIcon sx={{ml:1, mr:1}}/>
    <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
    글쓰기
    </Typography> 
    </Stack>
    </Link>
    </Stack>
  );
}
