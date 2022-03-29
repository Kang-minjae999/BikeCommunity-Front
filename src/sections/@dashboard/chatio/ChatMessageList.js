import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../../../components/Scrollbar';
import LightboxModal from '../../../components/LightboxModal';
import ChatMessageItem from './ChatMessageItem';
import ChatMessageItemio from './ChatMessageItemio';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
};

export default function ChatMessageList({ conversation, socket }) {

  const [msgList, setMsgList] = useState([]);

  const ref = useRef()


  useEffect(() => {
    // messsgeItem : {msg: String, name: String, timeStamp: String}
    socket.on("onReceive", (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
      scrollMessagesToBottom()
    });
    socket.on("onConnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    socket.on("onDisconnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);


  const scrollRef = useRef(null);

  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  const scrollMessagesToBottom = () => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
      
  };



  

   /*   useEffect(() => {
      scrollMessagesToBottom()
    }, [msgList]) */
    

  /* useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [socket]); */

  const imagesLightbox = conversation.messages
    .filter((messages) => messages.contentType === 'image')
    .map((messages) => messages.body);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, height: 1 }}>
        {conversation.messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            conversation={conversation}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
        {msgList.map((message, index) => (
          <ChatMessageItemio
            key={`${message.msg} ${index}`}
            message={message}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
        <div ref={ref}/>
      </Scrollbar>

      {/* <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      /> */}
    </>
  );
}
