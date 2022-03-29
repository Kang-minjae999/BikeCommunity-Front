import { useEffect, useState } from 'react';
// @mui
import { Card, Box, CardHeader, Container } from '@mui/material';
import socketIOClient from "socket.io-client";
// redux
import { useDispatch } from '../../redux/store';
import { getConversations, getContacts } from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ChatSidebarList, ChatWindow } from '../../sections/@dashboard/chatio';

// ----------------------------------------------------------------------
// http://localhost:3000/dashboard/chat/lucian.obrien

export default function Chat() {
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg')
 
  const myInfo = {
    roomName: '채팅방예시',
    userName: '강민순',
  };

  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient("localhost:5000"));
  }, []);

  if (currentSocket) {
    currentSocket.on("connect", () => {
      currentSocket.emit("join", myInfo);
    });
  }

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? true : 'xl'}>
           <ChatSidebarList /> 
      </Container>
    </Page>
  );
}
