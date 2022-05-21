// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack, Button, Avatar, Box } from '@mui/material';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(() => ({
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
    <>
    <Card sx={{bottom:50, right:0, left:0 ,zIndex:99, width:'90%', mb:-5}} >
      <Stack direction='column' sx={{width:'100%', mt:2, mb:2}} >
      <Stack direction="row" alignItems='center' justifyContent='space-around' sx={{my:2}}>
        <Avatar alt='정비소 프로필' 
        src='https://w.namu.la/s/7dae8d8ecea941c080085128fbe777b40d44a5acaa229dec3addbf532c83c216f0311a9f5d08b3927be9d69db610080e106982575cb15bb35e086285cfef7d1b3e77837d787948979c0f384e52c33942c90484fbebcfae0abd2d9488c33b4e5e827c3eed83de4b7d44642d663f86207f' 
        sx={{width:64, height:64, m:1}} />
      <Stack direction='column' alignItems='center' sx={{mt:2}}>
        <Typography fontSize={28} fontWeight='bold'>RIDERTOWN GARAGE</Typography>
        <Typography variant="body2" sx={{mb:2.5}}>정비 수리 커스텀</Typography>
      </Stack>
      <Box/>
      </Stack>
      <Stack direction="row" alignItems='center' justifyContent='center'sx={{mb:4}}>
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2" color='text.disabled'>
          경기도 군포시 산본동 보람타워 509호
          </Typography>
        </Stack>   
        <Stack direction='row' spacing={1} justifyContent='space-around' alignItems='center' sx={{mb:1}}>
        <Button variant='text'>
          <CallOutlinedIcon sx={{mr:1}}/>
            <Typography variant='body1'>
              전화
            </Typography>
        </Button>
        <Button variant='text'>
          <ForumOutlinedIcon sx={{mr:1}}/>
            <Typography variant='body1'>
              채팅
            </Typography>
        </Button>
        <Button variant='text'>
          <ContactSupportOutlinedIcon sx={{mr:1}}/>
            <Typography variant='body1'>
              질문
            </Typography>
        </Button>
        </Stack>   
      </Stack>
    </Card>
    <Card sx={{mt:2,mb:2, mx:2}}>
      <Typography variant="body1" sx={{my:3, mx:3}}>
          안녕하세요. 
          저희는 바이크 정비 수리 커스텀을 주로하는 라이더타운입니다. 반갑습니다
      </Typography> 
    </Card>
    </>
  );
}
