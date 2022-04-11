import { Button } from '@mui/material';
import {  useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from '../../../redux/store';
import { readAlert, addAlert, getAlert } from '../../../redux/slices/notification';
import NotificationsPopover from './NotificationsPopover';
import useAuth from '../../../hooks/useAuth';

const Notification = () => {
  const {user} = useAuth()
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const read = (event) => {
    dispatch(readAlert(event))
   /*  navigate('/dashboard/club') */
  }

  const notificationSnack = (event) =>  {
    if(event.data !== 'dummy'){
      dispatch(addAlert(event.data))
      enqueueSnackbar(<Button onClick={() => read(event.data)} sx={{color:'text.primary'}}>{event.data}</Button>,  
      {variant:'info', autoHideDuration:null,})
      dispatch(getAlert())  
    }     
  }

  useEffect (() => {
    if(user?.nickname){
      const eventSource = new EventSource(`http://localhost:8000/user-service/sse/${user.nickname}`);
      eventSource.addEventListener('sse', notificationSnack)
    }
  }, [user])
  
  
  
 /*  (event) => {
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

      let granted = false;
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
  }; */
  
/*   const fireNotification = () => {
    
    // notificationRef에 Notification을 넣어준다. 이 친구는 이렇게 할당만해도 바로 실행된다.
    notificationRef.current = new Notification('알림', datas)

    // 위에서 만든 클릭 이벤트 걸어주기
    setNotificationClickEvent(); 
    
  } */
  const [s, sets] = useState(0)

  const alerttest = {
    data: `안녕하세여${s}`
  }


  return (
    <>
    <Button onClick={() => notificationSnack(alerttest)+ sets(s+1)} sx={{color:'text.primary'}}>알림추가</Button>
    <NotificationsPopover />
    </>
  )
};

export default Notification;
