import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button, Typography, Box, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import axiosInstance from '../../../utils/axiosuser';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import useResponsive from '../../../hooks/useResponsive';
import { KAKAO_AUTH_API, KAKAO_REST_API, NAVER_CLIENT_ID, NAVER_REDIRECT } from '../../../config';

// ----------------------------------------------------------------------
export default function LoginForm() {
  const { login } = useAuth();

  const location = useLocation();

  const iskakao = location.pathname.includes('kakaologin');
  const isnaver = location.pathname.includes('naverlogin');

  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);


  const isDesktop = useResponsive('up', 'lg');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('정확한 이메일 주소를 입력해주세요.').required('이메일을 입력해주세요.'),
    password: Yup.string().required('비밀번호를 입력해주세요.'),
  });

  const defaultValues = {
    email: '',
    password: '',
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
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  const [openLogin, setOpenLogin] = useState(false)

  const Login = () => {
    setOpenLogin(!openLogin)
  }

  const kakaoLogin = () => {
    window.open(KAKAO_AUTH_API, '_self')
  }


  const KakaologinCallback = useCallback(async () => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code"); // 인가코드 받는 부분
    const granttype = "authorization_code";
    const clientid = `${KAKAO_REST_API}`;
    try {
      await axios.post(`https://kauth.kakao.com/oauth/token?
      grant_type=${granttype}
      &client_id=${clientid}
      &redirect_uri=http://localhost:3000/auth/kakaologin
      &code=${code}`
            , {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then((res) => {
          console.log(res)
      })
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    if(iskakao){
      KakaologinCallback()
    }
  }, [KakaologinCallback, iskakao])

  const NaverLoginInit = useCallback(() => {
    const login = new window.naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_REDIRECT,
      isPopup: false,
      callbakHandle:true,
      loginButton: {height: 1}
    })
    login.init();
  }, [])

  const naverLoginButton = () =>{
    const login = document.getElementById('naverIdLogin')?.firstChild;
    login.click();
  }

  useEffect(() => {
      NaverLoginInit()
    }, [NaverLoginInit])

  const NaverloginCallback = useCallback(async () => {    
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0]; 
    try {
      await axiosInstance.get('/login/oauth2/naver', {headers:{authorization:`bearer ${token}`}});
      navigate(PATH_DASHBOARD.root);
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    if(isnaver){
      NaverloginCallback()
    }
  }, [NaverloginCallback, isnaver])
  
  

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
   {openLogin && 
        <>
      <Card sx={{my:2, mx:2}}>
        <Stack spacing={3} sx={{mt:2, mx:1}}>
          <Typography variant='h6' sx={{mt:1, mx:1}}>라이더타운</Typography>
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

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 , mx:1}}>
          <RHFCheckbox name="remember" label="비밀번호 기억하기" />
          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword} sx={{color:'text.primary'}}>
            비밀번호가 기억이 안나시나요?
          </Link>
        </Stack>
      </Card>
      </>}
      <Stack spacing={2} sx={{mx:2}} justifyContent='center' alignItems='center'>
        {!openLogin && <Button          
        fullWidth
          size="large"
          variant="contained"
          sx={{
            height: isDesktop ? 65 : 55,
            fontSize: 18,
          }}
          color='secondary'
          onClick={Login}
          startIcon={
            <Typography variant='h4'
            sx={{
              fontSize: 24,
            }}>RT</Typography>}
        >
          <Box sx={{width:'90%'}}>
          <Typography variant='h6'>라이더타운 로그인</Typography>
          </Box>
        </Button>}
        {openLogin ? <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            height: isDesktop ? 65 : 55,
            fontSize: 18,
          }}
          startIcon={
            <Typography variant='h4'
            sx={{
              fontSize: 24,
            }}>RT</Typography>}
          color='secondary'
        >
          <Box sx={{width:'90%'}}>
          <Typography variant='h6'>로그인</Typography>
          </Box>
        </LoadingButton> : <></>}

        <Button          
        fullWidth
          size="large"
          variant="contained"
          onClick={kakaoLogin}
          target="_blank" 
          rel="noopener noreferrer"
          sx={{
            height: isDesktop ? 65 : 55,
            fontSize: 18,
            backgroundColor:'#FEE500'
          }}
          color='inherit'
          startIcon={<Iconify icon={'ri:kakao-talk-fill'} width={40} height={40} sx={{color:'#000000'}}/>}
        >
          <Box sx={{width:'90%'}}>
          <Typography variant='h6'>카카오 로그인</Typography>
          </Box>
        </Button>

        <Button         
        fullWidth
          size="large"
          variant="contained"
          target="_blank" 
          rel="noopener noreferrer"
          onClick={naverLoginButton}
          sx={{
            height: isDesktop ? 65 : 55,
            fontSize: 18,
            backgroundColor:'#2DB400'
          }}
          color='inherit'
          startIcon={<Iconify icon={'simple-icons:naver'} width={40} height={40} sx={{color:'#FFFFFF'}}/>}
        >
          <Box sx={{width:'90%',}}>
          <Typography variant='h6'>네이버 로그인</Typography>
          </Box>
        </Button>

        <Button variant='contained' color='inherit' component={RouterLink} to={PATH_AUTH.register} sx={{width:'50%'}}>
              <Typography variant="body2" align="center" sx={{my:1, fontSize:16}}>
                라이더타운 <strong>회원가입</strong>
              </Typography>
        </Button>
         <div id='naverIdLogin' style={{display:'none'}}/>
      </Stack>
    </FormProvider>
  );
}
