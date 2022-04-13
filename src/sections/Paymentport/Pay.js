// @mui
import { Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function Pay({ pay }) {
  const { price, payment, names } = pay;
  const { user } = useAuth();
  const onClickPayment = () => {
    const userCode = 'imp20014130';

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: payment, // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: price, // 결제금액
      name: names, // 주문명
      buyer_name: user.displayName, // 구매자 이름
      buyer_tel: user.phoneNumber, // 구매자 전화번호
      buyer_email: user.email, // 구매자 이메일
      buyer_addr: user.address, // 구매자 주소
      buyer_postcode: user.zipCode, // 구매자 우편번호
    };

    if (isReactNative()) {
      /* 5. 리액트 네이티브 환경에 대응하기 */
      const params = {
        userCode, // 가맹점 식별코드
        data, // 결제 데이터
        type: 'payment', // 결제와 본인인증 구분을 위한 필드
      };
      const paramsToString = JSON.stringify(params);
      window.ReactNativeWebView.postMessage(paramsToString);
    } else {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init(userCode);
      /* 4. 결제 창 호출하기 */
      IMP.request_pay(data, callback);
    }
  };

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, merchant_uid: merchantuid, error_msg: errormsg } = response;

    if (success) {
      alert(`결제 성공: ${merchantuid}`);
    } else {
      alert(`결제 실패: ${errormsg}`);
    }
  }

  function isReactNative() {
    /*
      리액트 네이티브 환경인지 여부를 판단해
      리액트 네이티브의 경우 IMP.payment()를 호출하는 대신
      iamport-react-native 모듈로 post message를 보낸다

      아래 예시는 모든 모바일 환경을 리액트 네이티브로 인식한 것으로
      실제로는 user agent에 값을 추가해 정확히 판단해야 한다
    */
    if (window.ReactNativeWebView) return true;
    return false;
  }

  return (
    <>
      <Button onClick={onClickPayment} variant="contained" sx={{ width: '100%', mt: 1 }}>
        결제하기
      </Button>
    </>
  );
}
