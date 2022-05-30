import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, Typography, Stack, Button, Avatar, Box, Divider, Modal, TextField } from '@mui/material';
import Iconify from '../../../../components/Iconify';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../utils/axios';
import { access, refresh } from '../../../../utils/jwt';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius:2,
  boxShadow: 24,
  p: 4,
};

ProfileName.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleOpen: PropTypes.func,
}

export default function ProfileName({open, setOpen, handleOpen}) {
  const { user } = useAuth();

  const [description, setDescription] = useState('')


  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmit = async () => {
     await axios.post('club-service/clubjoin', 
     description,
     {
       headers:
       {
        accesstoken:access,
        refreshtoken:refresh,
       }
      })
  };


  return (
    <>
    <Card sx={{bottom:50, right:0, left:0 ,zIndex:8, width:'100%', mb:-4}} >
      <Stack direction='column' sx={{width:'100%', mt:2, mb:2}} >
      <Stack direction="row" alignItems='center' justifyContent='space-around' sx={{my:2}}>
        <Avatar alt='정비소 프로필' 
        variant='rounded'
        src='https://w.namu.la/s/7dae8d8ecea941c080085128fbe777b40d44a5acaa229dec3addbf532c83c216f0311a9f5d08b3927be9d69db610080e106982575cb15bb35e086285cfef7d1b3e77837d787948979c0f384e52c33942c90484fbebcfae0abd2d9488c33b4e5e827c3eed83de4b7d44642d663f86207f' 
        sx={{width:72, height:72, m:1}} />
      <Stack direction='column' alignItems='center' sx={{mt:2}}>
        <Typography fontSize={28} fontWeight='bold'>라이더타운 노조</Typography>
        <Typography variant="body2" color='text.disabled' sx={{mb:2.5}}>경기 군포시</Typography>
      </Stack>
      <Box/>
      </Stack>
        <Divider />
        <Button variant='text' sx={{mt:2}} onClick={handleOpen}>
          <Iconify icon='ant-design:user-add-outlined' sx={{width:32, height:32, mr:1, color:'text.primary'}} />
            <Typography variant='body1' color='text.primary'>
              가입하기
            </Typography>
        </Button>
      </Stack>
    </Card>
    <div>
      <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            클럽 가입하기
          </Typography>
          <Typography variant='body2' sx={{ mt: 2 }}>
            {user?.nickname}강민순 님을 소개해주세요!
          </Typography>
          <TextField multiline onChange={handleChange} minRows={3} sx={{width:'100%', my:2}} autoFocus autoComplete="off"/>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{mx:2}}>
            <Button variant='text' sx={{mt:2}} onClick={handleClose}>
            <Iconify icon='ant-design:close-square-outlined' sx={{width:32, height:32, mr:1, color:'text.primary'}} />
              <Typography variant='body1' color='text.primary'>
                나가기
              </Typography>
            </Button>
            <Button variant='text' sx={{mt:2}} onClick={onSubmit}>
            <Iconify icon='ant-design:user-add-outlined' sx={{width:32, height:32, mr:1, color:'text.primary'}} />
              <Typography variant='body1' color='text.primary'>
                가입하기
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
    </>
  );
};
