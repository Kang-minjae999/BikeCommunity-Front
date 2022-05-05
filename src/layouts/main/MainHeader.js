import { useNavigate } from 'react-router';
import { Link as RouterLink  } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Container, Link, Typography, Button } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// ---------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const navigate = useNavigate('up', 'lg')

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link component={RouterLink} to="/dashboard/app"underline="none" >         
          {/*  <Label color="primary" sx={{ ml: 1 , mr: 2, typography: 'h4'}} variant = 'ghost'> */}
            <Typography color="primary" variant='h4' sx={{ ml: 1 , mr: 2}}>
            RIDERTOWN
            </Typography>
            </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={() => navigate('/dashboard/app')} sx={{color:'text.primary'}}>메인화면으로</Button>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
