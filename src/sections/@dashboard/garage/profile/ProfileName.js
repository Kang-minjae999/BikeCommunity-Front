import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack, Button, Avatar } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: 2,
  color:'gray'
}));



// ----------------------------------------------------------------------

export default function ProfileName() {

  return (
    <Card sx={{bottom:50, right:0, left:0 ,zIndex:99, width:'85%', borderColor:'text.primary', border:1, mb:-5}} >
      <Stack direction='column' alignItems='center' >
      <Stack direction="row" alignItems='center' >
        <Avatar alt='정비소 프로필' 
        src='https://w.namu.la/s/7dae8d8ecea941c080085128fbe777b40d44a5acaa229dec3addbf532c83c216f0311a9f5d08b3927be9d69db610080e106982575cb15bb35e086285cfef7d1b3e77837d787948979c0f384e52c33942c90484fbebcfae0abd2d9488c33b4e5e827c3eed83de4b7d44642d663f86207f' 
        sx={{width:64, height:64, border:1, mr:1}} />
      <Stack direction='column' alignItems='center' sx={{mt:2}}>
        <Typography fontSize={25} fontWeight='bold'>일론머스크</Typography>
        <Typography variant="subtitle2" sx={{mb:2.5}}>정비 수리 커스텀</Typography>
      </Stack>
      </Stack>
        <Typography variant="body1" sx={{mb:2.5, mx:3}}>
          안녕하세요. 저희는 바이크 정비 수리 커스텀을 주로하는 일론머스크입니다.
        그대 기억이~~~~지난 사랑이~~~~</Typography>
        <Stack direction="row" sx={{mb:1}}>
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body1">
            <Link component="span" variant="subtitle2" color="text.primary">
              경기도 군포시 산본동 보람타워 509호
            </Link>
          </Typography>
        </Stack>
        <Stack direction='row' spacing={1} sx={{mb:1}}>
          <Button variant='outlined'>전화하기</Button>
          <Button variant='outlined'>채팅하기</Button>
          <Button variant='outlined'>질문하기</Button>
        </Stack>      
      </Stack>
    </Card>
  );
}
