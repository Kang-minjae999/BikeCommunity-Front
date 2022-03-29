import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, IconButton, Divider } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
//
import ChatAccount from './ChatAccount';
import ChatSearchResults from './ChatSearchResults';
import ChatContactSearch from './ChatContactSearch';
import ChatConversationList from './ChatConversationList';

// ----------------------------------------------------------------------

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.darker,
  },
}));

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = '100%';
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [openSidebar, setOpenSidebar] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const [isSearchFocused, setSearchFocused] = useState(false);

  const { conversations, activeConversationId } = useSelector((state) => state.chat);

  const isDesktop = useResponsive('up', 'md');

  const displayResults = searchQuery && isSearchFocused;

/*   useEffect(() => {
     if (!isDesktop) {
      return handleCloseSidebar();
    } 
    return handleOpenSidebar();
  }, [isDesktop, pathname]); */

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };


  const handleSearchSelect = (username) => {
    setSearchFocused(false);
    setSearchQuery('');
    navigate(`${PATH_DASHBOARD.chat.root}/${username}`);
  };

  const handleSelectContact = (result) => {
    if (handleSearchSelect) {
      handleSearchSelect(result.username);
    }
  };

  const renderContent = (
    <>
    <Box sx={{border:1, borderColor:'primary.lighter'}}>
      {isDesktop && <Box sx={{ py: 1, px: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
            <>
              <ChatAccount />
            </>    
            {/* <IconButton onClick={() => navigate(PATH_DASHBOARD.chat.new)}>
              <Iconify icon={'eva:edit-fill'} width={20} height={20} />
            </IconButton> */}
        </Stack>
      </Box>}
      <Divider />
      <Scrollbar>
        {!displayResults ? (
          <ChatConversationList
            conversations={conversations}
            isOpenSidebar={openSidebar}
            activeConversationId={activeConversationId}
            sx={{ ...(isSearchFocused && { display: 'none' }) }}
          />
        ) : (
          <ChatSearchResults query={searchQuery} results={searchResults} onSelectContact={handleSelectContact} />
        )}
      </Scrollbar>
      </Box>
    </>
  );

  return (
    <>
        <Drawer
          open={openSidebar}
          variant="persistent"
          sx={{
            width: SIDEBAR_WIDTH,
            '& .MuiDrawer-paper': {
              position: 'static',
              width: SIDEBAR_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
    </>
  );
}
