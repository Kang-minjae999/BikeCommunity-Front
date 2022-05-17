import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Stack, Drawer, Divider } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Scrollbar from '../../../components/Scrollbar';
//
import ChatAccount from './ChatAccount';
import ChatSearchResults from './ChatSearchResults';
import ChatConversationList from './ChatConversationList';



// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = '100%';

export default function ChatSidebar() {

  const navigate = useNavigate();

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


  const handleSearchSelect = (username) => {
    setSearchFocused(false);
    setSearchQuery('');
    navigate(`${PATH_DASHBOARD.chat.root}/${username}`);
  };

  const handleSelectContact = (result) => {
    if (handleSearchSelect) {
      handleSearchSelect(result.username);
      // ? ? 
      setOpenSidebar()
      setSearchResults()
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
