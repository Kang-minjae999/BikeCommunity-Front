import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack } from '@mui/material';
// // components
// import Logo from '../../components/Logo';
import SocialsButton from '../../components/SocialsButton';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: '주소',
    children: [
      { name: '경기도 군포시 산본동 339 보람타워 5층 9호', href:'' },
    ],
  },  
  {
    headline: '사업자 등록번호',
    children: [
      { name: '775-13-02117', href: '' },
    ],
  },
  {
    headline: '통신판매업 신고번호',
    children: [
      { name: '제 2021-경기군포-00000호 대표 강민재', href:''},
    ],
  },
  {
    headline: '대표전화 및 문의',
    children: [
      { name: '010-5519-7425', href:'tel:01055197425' },
      { name: 'ridertown@naver.com', href:'' },
      { name: '고객센터', href:'/faqs' },
    ],
  },
  {
    headline: '약관',
    children: [
      { name: '개인정보처리방침', href: '' },
      { name: '전자상거래처리약관', href: '' },
      { name: '라이더타운이용약관', href: '' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={8} md={12} sx={{ mb: 3 }}>
            <Stack
              direction={{ xs: 'column', md: 'column' }}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 5, } }}
              spacing={2}
            >
             <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              RIDERTOWN (주)
            </Typography>
              <SocialsButton  />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline">
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color="inherit"
                      variant="body2"
                      href={link.href}
                      component={RouterLink}
                      sx={{ display: 'block' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          COPYRIGHT(C)2021.RIDERTOWN All RIGHTS RESERVED
        </Typography>
      </Container>
    </RootStyle>
  );
}
