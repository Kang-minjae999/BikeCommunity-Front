// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { FaqsHero, FaqsCategory, FaqsList, FaqsForm } from '../sections/faqs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Faqs() {
  return (
    <Page title="Faqs">
      <RootStyle>
         <FaqsHero /> 
        <Container sx={{ mt: 2, mb: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 5 }}>
            자주 하는 질문
          </Typography>
              <FaqsList />
            </Grid>
            <Grid item xs={12} md={6}>
              <FaqsForm />
            </Grid>
          </Grid>
          <FaqsCategory />
        </Container>
      </RootStyle>
    </Page>
  );
}
