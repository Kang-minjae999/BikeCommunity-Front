import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Link, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import LoginKakao from '../../sections/auth/login/LoginKakao';

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
  background: 'url(/LoginBack.png)',  
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

// ----------------------------------------------------------------------

export default function LoginKakaoPage() {

  return (
    <Page title="Login">
      <RootStyle>
            <HeaderStyle>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                <Link component={RouterLink} to="/dashboard/app" underline="none">
                  <Typography color="text.primary" variant="h4" sx={{ mr: 2 }}>
                    RIDERTOWN
                  </Typography>
                </Link>
              </Stack>
            </HeaderStyle>
            <Container maxWidth="sm" disableGutters>
              <ContentStyle>
                <LoginKakao />
              </ContentStyle>
            </Container>
      </RootStyle>
    </Page>
  );
}
