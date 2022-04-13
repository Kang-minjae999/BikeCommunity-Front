import { Container, Typography } from '@mui/material';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import Appweather from './Appweather';

// ----------------------------------------------------------------------

export default function AppRidingHome() {

  return (
    <>
    <Container>
    <Appweather />
      <Typography sx={{mt:2,ml:2,mb:2}}>
        대표 바이크 보여주기 , 
        라이딩에 목적지 설정하기 추가해서 바이크랑 목적지 보내주기 
      </Typography>
      <Typography sx={{mt:2,ml:2,mb:2}}>
      라이더들 목적지
      </Typography>
    <GeneralMap/>
    </Container>
    </>
  );
}
