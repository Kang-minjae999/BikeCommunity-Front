import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
// components
import Image from '../../../components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

ChatMessageItemio.propTypes = {
  message: PropTypes.object.isRequired,
  onOpenLightbox: PropTypes.func,
};

export default function ChatMessageItemio({ message, onOpenLightbox }) {

/*   const sender = conversation.participants.find((participant) => participant.id === message.senderId); */
/*   const senderDetails =
    message.senderId === '8864c717-587d-472a-929a-8e5f298024da-0'
      ? { type: 'me' }
      : { avatar: sender?.avatar, name: sender?.name }; */

/*   const isMe = senderDetails.type === 'me'; */

/*   const ref = useRef()
  
  const scrollMessagesToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
};

useEffect(() => {
    scrollMessagesToBottom()
}, [message]) */



  const isImage = message?.type === 'image'; 
  
  const {user} = useAuth()
  const [isMe, setisMe] = useState(null)

  useEffect(() => {
    if(message?.userName === user?.displayName){
      setisMe(true)
    } else {
      setisMe(false)
    }
  }, [message,user])

  return (
    <RootStyle>
    <Box
      sx={{
        display: 'flex',
         ...(isMe && {
          ml: 'auto',
        }), 
      }}
    >
      <div>
        <InfoStyle
          variant="caption"
          sx={{
            ...(isMe && { justifyContent: 'flex-end' }), 
          }}
        >
          <Avatar alt={message.avatar} src={message.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
          <strong>{`${message.userName},`}</strong>&nbsp;
          {`${message.timeStamp}`}
        </InfoStyle>

        <ContentStyle
           sx={{
            ...(isMe && { color: 'grey.800', bgcolor: 'primary.lighter' }),
          }} 
        >
           {isImage ? (
            <Image
              alt="attachment"
              src={message.msg}
              onClick={() => onOpenLightbox(message.msg)}
              sx={{ borderRadius: 1, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
            />
          ) : (
            <Typography variant="body2">{message.msg}</Typography>
          )} 
        </ContentStyle>
      </div>
    </Box>
  </RootStyle>

/*     <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto',
          }),
        }}
      >
        {senderDetails.type !== 'me' && (
          <Avatar alt={senderDetails.name} src={senderDetails.avatar} sx={{ width: 32, height: 32, mr: 2 }} />
        )} 

        <div>
          <InfoStyle
            variant="caption"
            sx={{
              ...(isMe && { justifyContent: 'flex-end' }),
            }}
          >
            {!isMe && `${firstName},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </InfoStyle>

          <ContentStyle
            sx={{
              ...(isMe && { color: 'grey.800', bgcolor: 'primary.lighter' }),
              ...(isImage && { p: 0 }),
            }}
          >
            {isImage ? (
              <Image
                alt="attachment"
                src={message.body}
                onClick={() => onOpenLightbox(message.body)}
                sx={{ borderRadius: 1, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              />
            ) : (
              <Typography variant="body2">{message.body}</Typography>
            )}
          </ContentStyle>
        </div>
      </Box>
    </RootStyle> */
  );
}
