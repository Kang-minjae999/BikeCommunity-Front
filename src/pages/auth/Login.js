import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Link, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import { LoginForm } from '../../sections/auth/login';


// ----------------------------------------------------------------------

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
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {

  const isDesktop = useResponsive('up', 'lg')



  return (
    <Page title="Login">
      <RootStyle>
      {isDesktop &&<>
      <HeaderStyle>
        <Stack 
        direction="row"
        justifyContent="flex-start"
        alignItems="center" 
        spacing={1}>
        <Logo sx={{ mb: 0.5 }}/>
        <Link component={RouterLink} to="/dashboard/app"underline="none" >         
            <Typography color="text.primary" variant='h4' sx={{ ml: 1 , mr: 2}}>
            RIDERTOWN
            </Typography>
            </Link>
        </Stack>
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              계정이 없으신가요? {''}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                회원가입
              </Link>
            </Typography>
        </HeaderStyle>



        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  로그인
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>아이디와 비밀번호를 입력해주세요.</Typography>
              </Box>
              <Tooltip title='회원가입' placement="right">
              <Typography variant="body2" sx={{ mt: { md: 2 } }}>
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              회원가입
              </Link>
            </Typography>
              </Tooltip>
            </Stack>
            <LoginForm />
          </ContentStyle>
        </Container></>}

 {/* ------------------------------------------------------------------------ */}
      {!isDesktop &&  <>
      <HeaderStyle>
        <Stack 
        direction="row"
        justifyContent="flex-start"
        alignItems="center" 
        spacing={1}>
        <Logo sx={{ mb: 0.5 }}/>
        <Link component={RouterLink} to="/dashboard/app"underline="none" >         
            <Typography color="text.primary" variant='h4' sx={{ ml: 1 , mr: 2}}>
            RIDERTOWN
            </Typography>
            </Link>
        </Stack>
        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  로그인
                </Typography>
              </Box>
            </Stack>
            <LoginForm />
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                계정이 없으신가요?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register} sx={{color:'text.primary'}}>
                  회원가입
                </Link>
              </Typography>
          </ContentStyle>
        </Container> </>}
      </RootStyle>
    </Page>
  );
}
