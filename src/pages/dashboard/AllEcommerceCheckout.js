// @mui
import {  Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import { Aecheckouthead } from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------


export default function AllEcommerceCheckout() {
  const { themeStretch } = useSettings();

  return (
      <Container maxWidth={themeStretch ? false : 'xl'} disableGutters>
        <Aecheckouthead />
      </Container>
  );
}
