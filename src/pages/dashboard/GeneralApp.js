// @mui
import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
// sections

import MainFooter from '../../layouts/main/MainFooter';
import { AppHomeHeader } from '../../sections/@dashboard/general/app';
// ----------------------------------------------------------------------

export default function GeneralApp() {

  return (
    <Page title="라이더타운">
      <Container disableGutters maxWidth='xl'>
         <AppHomeHeader /> 
         <MainFooter />
      </Container>
    </Page>
  );
}