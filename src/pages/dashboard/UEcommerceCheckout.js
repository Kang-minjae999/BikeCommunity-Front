import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCart, createBilling } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  CheckoutCart,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress,
} from '../../sections/@dashboard/used-e-commerce/checkout';

// ----------------------------------------------------------------------


export default function UEcommerceCheckout() {
  const { themeStretch } = useSettings();
  const { heart } = useSelector((state) => state.product);


  return (
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}}>
        {/* <CheckoutCart /> */}
        {heart && <Typography>{heart.map((item)=> (item))}</Typography>}
      </Container>
  );
}
