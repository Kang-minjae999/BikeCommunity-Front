import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Typography, Button, Stack, Container } from '@mui/material';
import axios from '../../../../utils/axios';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import AppUserMotoNew from './AppUserMotoNew';
import useResponsive from '../../../../hooks/useResponsive';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';


// ----------------------------------------------------------------------


export default function AppUserMoto() {
  const isDesktop = useResponsive('up', 'lg')

  const isMountedRef = useIsMountedRef();

  const [motos, setMotos] = useState()
  
  const getMoto = useCallback(async () => {
    try {
      const response = await axios.get(`/personalbikeinfo-service/posts?page=0&size=12`);

      if (isMountedRef.current) {
        setMotos(response.data.data.content);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMoto()
  }, [getMoto])
  


  const [newMoto, setNewMoto] = useState(false)

  const onNew = () => {
    setNewMoto(!newMoto)
  }

  return (
      <>
      <Container maxWidth='lg'>
      {isDesktop && <HeaderBreadcrumbs heading="내 바이크" links={[{ name: '' }]} sx={{mt:2}}/>}
      <Stack justifyContent='center' alignItems='center'>
      {!newMoto && 
      <>
      <Typography sx={{mb:2, mx:2, mt:5}}>
        등록된 바이크가 없어요!
      </Typography>
      <Typography sx={{mb:2, mx:2}}>
        바이크를 등록해보세요!
      </Typography>
      <Button variant='outlined' sx={{}} onClick={onNew}>바이크 등록하기</Button>
      </>}

      {newMoto && 
        <>
          <Button variant='outlined' sx={{}} onClick={onNew}>목록으로 돌아가기</Button>
          <AppUserMotoNew />
        </>}
      </Stack>
      </Container>
      </>
  );
}
