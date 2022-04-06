import { Container, Typography } from '@mui/material';
import Appweather from './Appweather';

// ----------------------------------------------------------------------

export default function AppRidingHome() {

  return (
    <>
    <Container>
    <Appweather />
    <Typography sx={{mt:2,ml:2,mb:2}}>
      대표 바이크 보여주기 
    </Typography>
    </Container>
    </>
  );
}
