import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Typography,Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { onBackStep, onNextStep, createBilling } from '../../../../redux/slices/product';
// _mock_
import Iconify from '../../../../components/Iconify';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';
import useResponsive from '../../../../hooks/useResponsive';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress() {
  //
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { total, discount, subtotal } = checkout;
  const isDesktop = useResponsive('up','lg');
  const {user} = useAuth();
  const {address, zipCode, displayName, phoneNumber} = user
  //
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleCreateBilling = (value) => {
    dispatch(createBilling(value));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
        {!isDesktop && <Button
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
              sx={{mb:1}}
            >
              상품 다시 선택하기
            </Button>}
            </Stack>{/* 
          {user.map((user, index) => ( */}
            <AddressItem
              /* key={index} */
              address={address}
              zipCode={zipCode}
              displayName={displayName}
              phoneNumber={phoneNumber}
              onNextStep={handleNextStep}
              onCreateBilling={handleCreateBilling}
            />
      {/*   ))} */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {isDesktop && <Button
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
            >
              돌아가기
            </Button>}
            <Button size="small" onClick={handleClickOpen} startIcon={<Iconify icon={'eva:plus-fill'} />}>
              새 주소 등록하기
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
        </Grid>
      </Grid>

      <CheckoutNewAddressForm
        open={open}
        onClose={handleClose}
        onNextStep={handleNextStep}
        onCreateBilling={handleCreateBilling}
      />
    </>
  );
}

// ----------------------------------------------------------------------

AddressItem.propTypes = {
  address: PropTypes.string,
  zipCode: PropTypes.string,
  displayName: PropTypes.string,
  phoneNumber: PropTypes.string,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

function AddressItem({ address, zipCode, displayName, phoneNumber ,onNextStep, onCreateBilling}) {
  const bill = {
    Address:address,
    Zipcode:zipCode,
    Displayname:displayName,
    Phonenumber:phoneNumber,
  }
  const handleCreateBilling = () => {
    onCreateBilling(bill);
    onNextStep();
  };

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{displayName}</Typography>
        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({addressType})
        </Typography>  
        {isDefault && (
          <Label color="info" sx={{ ml: 1 }}>
            Default
          </Label>
        )} */}
      </Box>
      <Typography variant="body2" gutterBottom>
        {address} / {zipCode}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {phoneNumber}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          position: { sm: 'absolute' },
          right: { sm: 24 },
          bottom: { sm: 24 },
        }}
      >
        {/* {!isDefault && (
          <Button variant="outlined" size="small" color="inherit">
            삭제
          </Button>
        )} */}
        <Box sx={{ mx: 0.5 }} />
        <Button variant="outlined" size="small" onClick={handleCreateBilling}>
          여기로 보낼게요!
        </Button>
      </Box>
    </Card>
  );
}
