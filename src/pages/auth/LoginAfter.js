import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Typography, Button, Stack, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import axios from '../../utils/axiosuser';
import { Phonecheck } from '../../sections/auth/register';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function LoginAfter() {
  const navigate = useNavigate()
  const { user, afterlogin } = useAuth()
  const [loginValue, setLoginValue] = useState(0)

  useEffect(() => {
    if(!user?.role === 'ROLE_GUEST'){
      navigate('/dashboard/app')
    } 
  }, [user ,navigate])

  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    nickname: Yup.string().required('닉네임이 필요합니다!'),
  });

  const defaultValues = {
    nickname: '',
    name:'',
    phoneNumber:  '',
    birthday: '',
    sex: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (data) => {
    const users = {...data, socizlPk:user.socialPk, socialType:user.socialType}
    console.log('온서밋',users)
    try {
      await afterlogin(users)
      enqueueSnackbar('회원 가입 완료!');
      navigate('/dashboard/app')
    } catch (error) {
      console.error(error);
    }
  };

  const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  
  const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7),
    },
  }));
  
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(8, 0),
    backgroundImage: `url(${'https://inbangnation.com/files/attach/images/2021/05/31/4a49234481ef9c7eb46763342ad51459.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }));
  
  return (
    <Page title="Login">
    <RootStyle>
          <HeaderStyle>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                <Typography color="text.primary" variant="h4" sx={{ mr: 2 }}>
                  RIDERTOWN
                </Typography>
            </Stack>
          </HeaderStyle>
          <Container maxWidth="sm" disableGutters>
            <ContentStyle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              {/* <Phonecheck /> */}
              {loginValue === 0 && 
              <>아래 텍스트필드는 본인인증시 삭제
              <RHFTextField name="name" label="이름" />
              <RHFTextField name="phoneNumber" label="번호" />
              <RHFTextField name="sex" label="성별" />
              <RHFTextField name="birthday" label="생일" />
              <Button onClick={() => setLoginValue(1)} variant='outlined' color='inherit'>넘어가기</Button>
              </>}

              {loginValue === 1 && 
              <>
              <RHFTextField name="nickname" label="닉네임" />
              <LoadingButton type="submit" fullWidth variant="outlined" color='inherit' loading={isSubmitting}>
                저장하기
              </LoadingButton>
              </>}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
            </ContentStyle>
          </Container>
    </RootStyle>
  </Page>

  );
}
