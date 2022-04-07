import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const GeneralAppChan = () => {
  const { enqueueSnackbar } = useSnackbar();
  // const id = document.getElementById('id');
  // // console.log(id);
  // new Notification('dsds');
  const [data, setData] = useState('');
  const listner = (event) => {
    setData(JSON.parse(event.data));
  };
  const no = new Notification('알림', data);

  document.addEventListener('sse', listner);
  const eventSource = new EventSource(`http://localhost:8000/user-service/sse/1`);
  eventSource.addEventListener('sse', (event) => {
    const data = event.data;
    // const data = JSON.parse(event.data);
    console.log(event);
    (async () => {
      const showNotification = () => {
        const notification = new Notification('안녕하세요', {
          body: data,
        });
        setTimeout(() => {
          notification.close();
        }, 10 * 1000);
        notification.addEventListener('click', () => {
          window.open('https://www.naver.com', '_blank');
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

  return <div>ㅗㅜㅑ</div>;
};

export default GeneralAppChan;
