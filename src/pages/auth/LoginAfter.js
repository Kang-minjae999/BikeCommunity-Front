import * as Yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Card, Typography, Stack, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { Phonecheck } from '../../sections/auth/register';

// ----------------------------------------------------------------------

export default function LoginAfter() {
  const navigate = useNavigate()
  const { user, afterlogin } = useAuth()

  useEffect(() => {
    if(!user?.role === 'ROLE_GUEST'){
      navigate('/dashboard/app')
    } 
  }, [])

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
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch()

  const onSubmit = async () => {
    const users = 
    {
      ...values, socialPk:user.socialPk, socialType:user.socialType
    }
    try {
      await afterlogin(users)
      enqueueSnackbar('회원 가입 완료!');
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
    <RootStyle>
      <HeaderStyle>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Typography color="text.primary" variant="h4" sx={{ mr: 2 }}>
              RIDERTOWN
            </Typography>
        </Stack>
      </HeaderStyle>
        <ContentStyle>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3 }}>
                  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}>
                      {/* <Phonecheck /> */}
                      아래 텍스트필드는 본인인증시 삭제
                      <RHFTextField name="name" label="이름" />
                      <RHFTextField name="phoneNumber" label="번호" />
                      <RHFTextField name="sex" label="성별" />
                      <RHFTextField name="birthday" label="생일" />
                      <RHFTextField name="nickname" label="닉네임" />
                      <LoadingButton type="submit" fullWidth variant="outlined" color='inherit' loading={isSubmitting}>
                        저장하기
                      </LoadingButton>
                    </Stack>
                  </FormProvider>
                  </Card>
                </Grid>
              </Grid>
     </ContentStyle>
    </RootStyle>
  );
}
