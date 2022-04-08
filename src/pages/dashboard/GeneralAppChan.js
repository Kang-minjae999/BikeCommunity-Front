import { Button } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const GeneralAppChan = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const notificationRef = useRef(null);

  const nana = () => {
   const na = new Notification('알림', {data:'알림창 테스트'})
  } 
  const [datas, setdatas] = useState()
  const eventSource = new EventSource(`http://localhost:8000/user-service/sse/1`);

  eventSource.addEventListener('sse', (event) => {
    const datas = event.data;
    enqueueSnackbar(event.data)
    setdatas(event.data)

    new Notification('알림', {data:'알림창 테스트'})
    (async () => {
      const showNotification = () => {
        const notification = new Notification('안녕하세요', {
          body: datas,
        });
        setTimeout(() => {
          notification.close();
        }, 10 * 1000);
        notification.onclick(() => {window.open('https://www.naver.com');
        });
      };
      // 브라우저 알림 허용 권한
      let granted = false;
      console.log('Notification.permission', Notification.permission);
      if (Notification.permission === 'granted') {
        granted = true;
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        granted = permission === 'granted';
      }
      // 알림 보여주기
      if (granted) {
        showNotification();
      }
    })();
  });

  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notificationRef.current.close();
    };
  };
  
  const fireNotification = () => {
    
    // notificationRef에 Notification을 넣어준다. 이 친구는 이렇게 할당만해도 바로 실행된다.
    notificationRef.current = new Notification('알림', datas)

    // 위에서 만든 클릭 이벤트 걸어주기
    setNotificationClickEvent(); 
    
  }
  const enqueueSnackbarRef = useRef()
  console.log(enqueueSnackbarRef)
  const goto = () => {
    navigate('/dashboard/club')
  }
  const onClose = (key) => {
    enqueueSnackbarRef.current.closeSnackbar(key)
  }
  const game = () =>  enqueueSnackbar(<Button onClick={goto} sx={{color:'text.primary'}}>누군가 회원님의 매물을 찜했어요.</Button>,  
  {variant:'info', autoHideDuration:null,})  


  return (
    <div>asdsadsadsadsadsadsadsadsdsadasdsasad
    <Button onClick={game} > sadsadsadsadsadsadsadsadsadsad</Button>
    </div>
  )
};

export default GeneralAppChan;
