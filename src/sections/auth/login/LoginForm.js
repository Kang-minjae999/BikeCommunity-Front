import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Naverloginimg from './naverloginimg.png';
import Kakaologinimg from './kakaologinimg.png';
import Kakaologincallback from './Kakaologincallback';
import useResponsive from '../../../hooks/useResponsive';
import { KAKAO_AUTH_API } from '../../../config';

// ----------------------------------------------------------------------
export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const isDesktop = useResponsive('up', 'lg');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('정확한 이메일 주소를 입력해주세요.').required('이메일을 입력해주세요.'),
    password: Yup.string().required('비밀번호를 입력해주세요.'),
  });

  const defaultValues = {
    email: 'lpl@naver.com',
    password: 'dlcksdud12~',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="이메일" />

        <RHFTextField
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="비밀번호 기억하기" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          비밀번호가 기억이 안나시나요?
        </Link>
      </Stack>
      <Stack spacing={2}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            height: isDesktop ? 65 : 55,
            fontSize: 18,
          }}
        >
          로그인
        </LoadingButton>
        {/* <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        > */}
        <a href={KAKAO_AUTH_API} target="_blank" rel="noopener noreferrer">
          <img style={{ width: '100%', height: isDesktop ? 65 : 55 }} src={Kakaologinimg} alt="Naverloginimg" />
        </a>
        <a href="https://naver.com" target="_blank" rel="noopener noreferrer">
          <img style={{ width: '100%', height: isDesktop ? 65 : 55 }} src={Naverloginimg} alt="Naverloginimg" />
        </a>
      </Stack>
      {/* </Stack> */}
      <Kakaologincallback />
    </FormProvider>
  );
}
