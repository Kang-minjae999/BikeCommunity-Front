const GeneralAppChan = () => {
  const id = document.getElementById('id');
  const eventSource = new EventSource(`http://localhost:8080/user-service/users/sse${id}`);

  eventSource.addEventListener('sse', (event) => {
    console.log(event.data);
    const data = JSON.parse(event.data);
    (async () => {
      const showNotification = () => {
        const notification = new Notification('코드 봐줘', {
          body: data.content,
        });
        setTimeout(() => {
          notification.close();
        }, 10 * 1000);
        notification.addEventListener('click', () => {
          window.open(data.url, '_blank');
        });
      };
      // 브라우저 알림 허용 권한
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
  return <div>ㅗㅜㅑ</div>;
};

export default GeneralAppChan;
