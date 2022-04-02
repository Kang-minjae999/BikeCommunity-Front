// @mui
import {  Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { Aecheckouthead } from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------


export default function AEcommerceCheckout() {
  const { themeStretch } = useSettings();

  return (
    <Page title="리스트">
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}}>
        <HeaderBreadcrumbs
          heading="Checkout/Cart"
          links={[
            { name: '' },
          ]}
        />
        <Aecheckouthead />
      </Container>
    </Page>
  );
}
