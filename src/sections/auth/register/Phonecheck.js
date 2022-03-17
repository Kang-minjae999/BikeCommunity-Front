import React from 'react';
import { Button } from '@mui/material';

export default function Phonecheck () {
  function onClickCertification() {
    const userCode = 'imp20014130';

    /* 2. 본인인증 데이터 정의하기 */
    const data = {
      merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
      company: '아임포트',                           // 회사명 또는 URL
      carrier: 'SKT',                              // 통신사
      name: '홍길동',                                // 이름
      phone: '01012341234',                        // 전화번호
    };

    if (isReactNative()) {
      /* 5. 리액트 네이티브 환경에 대응하기 */
      const params = {
        userCode,                                   // 가맹점 식별코드
        data,                                       // 본인인증 데이터
        type: 'certification',                      // 결제와 본인인증 구분을 위한 필드
      };
      const paramsToString = JSON.stringify(params);
      window.ReactNativeWebView.postMessage(paramsToString);
    } else {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init(userCode);
      /* 4. 본인인증 창 호출하기 */
      IMP.certification(data, callback);
    }
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const {
      success,
      merchant_uid:merchantuid,
      error_msg:errormsg,
    } = response;

    if (success) {
      alert(`본인인증 성공 ${merchantuid}`);
    } else {
      alert(`본인인증 실패: ${errormsg}`);
    }
  }

  function isReactNative() {
    /*
      리액트 네이티브 환경인지 여부를 판단해
      리액트 네이티브의 경우 IMP.certification()를 호출하는 대신
      iamport-react-native 모듈로 post message를 보낸다

      아래 예시는 모든 모바일 환경을 리액트 네이티브로 인식한 것으로
      실제로는 user agent에 값을 추가해 정확히 판단해야 한다
    */
    if (window.ReactNativeWebView) return true;
    return false;
  }

  return (
    <>
    <Button onClick={onClickCertification()}>본인인증 하기</Button>
    </>
  );
}