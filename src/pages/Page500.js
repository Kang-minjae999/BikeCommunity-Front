import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// @mui
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <Page title="500 Internal Server Error" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              서버와의 연결 오류가 있어요!
            </Typography>
            <Typography sx={{ color: 'text.secondary' ,mb:2}}>다시 시도해주세요!</Typography>
            <Button to="/dashboard/app" size="large" variant="contained" component={RouterLink}>
              돌아아기
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
