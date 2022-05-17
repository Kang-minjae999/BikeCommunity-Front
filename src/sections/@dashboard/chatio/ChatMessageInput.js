import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Input, Divider, IconButton, InputAdornment } from '@mui/material';
// utils
// components
import Iconify from '../../../components/Iconify';
import EmojiPicker from '../../../components/EmojiPicker';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
  socket: PropTypes.object,
};

export default function ChatMessageInput({ socket }) {
  const [chatMessage, setChatMessage] = useState("");


  const fileInputRef = useRef(null);


  const handleSubmit = () => {
    if (!chatMessage) {
      console.log('여긴가')
      setChatMessage('')
    }
    else {
      socket.emit("onSend", {
        userName: 'Jaydon Frankie',
        msg: chatMessage,
        timeStamp: new Date().toLocaleTimeString(),
        avatar: 'http://image.dongascience.com/Photo/2021/04/c5c9b540e401819927726c0d3e250565.jpg',
        type: 'text',
      });
      setChatMessage("");
    }
  };

  
  const handleSubmitImage = () => {
      socket.emit("onSend", {
        userName: 'Jaydon Frankie',
        msg: 'https://file.mk.co.kr/meet/neds/2017/07/image_readmed_2017_440610_14988564642939654.jpeg' ,
        timeStamp: new Date().toLocaleTimeString(),
        avatar: 'http://image.dongascience.com/Photo/2021/04/c5c9b540e401819927726c0d3e250565.jpg',
        type: 'image',
      });
  };


  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const onImageChange =  () => {
    handleSubmitImage();
  }
  

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const onChatMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <RootStyle>
      <Input
        fullWidth
        value={chatMessage}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={onChatMessageChange}
        placeholder="메세지를 입력해주세요!"
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker value={chatMessage} setValue={setChatMessage} />
          </InputAdornment>
        }
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton  size="small" onClick={handleAttach}>
              <Iconify icon="ic:round-add-photo-alternate" width={22} height={22} />
            </IconButton>
          </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton color="primary" disabled={!chatMessage} onClick={handleSubmit} sx={{ mx: 1 }}>
        <Iconify icon="ic:round-send" width={22} height={22} />
      </IconButton>

      <input type="file" accept='image/*' id='imageupload' className='imageupload' ref={fileInputRef} onChange={onImageChange} style={{ display: 'none' }} />
    </RootStyle>
  );
}
