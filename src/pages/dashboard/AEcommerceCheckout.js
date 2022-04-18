// @mui
import {  Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { Aecheckouthead } from '../../sections/@dashboard/general/app';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------


export default function AEcommerceCheckout() {
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg')

  return (
      <Container maxWidth={themeStretch ? false : 'xl'} >
        {isDesktop && <HeaderBreadcrumbs
          heading="Checkout/Cart"
          links={[
            { name: '' },
          ]}
        />}
        <Aecheckouthead />
      </Container>
  );
}
