import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Link, Tooltip, Container, Typography, Button } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import { LoginForm } from '../../sections/auth/login';
import Image from '../../components/Image';


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
  justifyContent: 'flex-end',
  padding: theme.spacing(8, 0),
  backgroundImage: `url(${"https://cdn.sports.hankooki.com/news/photo/202105/img_6597675_0.jpg"})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const ContentStylePC = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 0),
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
        <Link component={RouterLink} to="/dashboard/app"underline="none" >         
            <Typography color="text.primary" variant='h4' sx={{ ml: 1 , mr: 2}}>
            RIDERTOWN
            </Typography>
            </Link>
        </Stack>
        </HeaderStyle>



        <Container maxWidth="sm">
          <ContentStylePC>
            <LoginForm />
          </ContentStylePC>
        </Container></>}

 {/* ------------------------------------------------------------------------ */}

      {!isDesktop &&  <>
      <HeaderStyle>
        <Stack 
        direction="row"
        justifyContent="flex-start"
        alignItems="center" 
        spacing={1}>
        <Link component={RouterLink} to="/dashboard/app"underline="none" >         
            <Typography color="text.primary" variant='h4' sx={{ mr: 2}}>
            RIDERTOWN
            </Typography>
            </Link>
        </Stack>
        </HeaderStyle>
        <Container maxWidth="sm" disableGutters>
          <ContentStyle>
            <LoginForm />
          </ContentStyle>
        </Container> </>}
      </RootStyle>
    </Page>
  );
}
