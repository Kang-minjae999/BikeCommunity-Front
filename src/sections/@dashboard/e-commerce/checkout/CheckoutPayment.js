import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { onGotoStep, onBackStep, onNextStep, applyShipping } from '../../../../redux/slices/product';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider } from '../../../../components/hook-form';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import Pay from '../../../payment2/Pay';
import { fCurrency } from '../../../../utils/formatNumber';
import useResponsive from '../../../../hooks/useResponsive';

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS = [
  {
    value: 0,
    title: 'Standard delivery (Free)',
    description: 'Delivered on Monday, August 12',
  },
  {
    value: 2,
    title: 'Fast delivery ($2,00)',
    description: 'Delivered on Monday, August 5',
  },
];

const PAYMENT_OPTIONS = [
  {
    value: 'card',
    title: '신용카드',
    description: '',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'phone',
    title: '휴대폰결제',
    description: '',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'trans',
    title: '계좌이체',
    description: '',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'vbank',
    title: '가상계좌',
    description: '',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
];

const PAYMENT_OPTIONS2 = [
  {
    value: 'kakaopay',
    title: '카카오페이',
    description: '',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'samsung',
    title: '삼성페이',
    description: '',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'payco',
    title: '페이코',
    description: '',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'tosspay',
    title: '토스',
    description: '',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
];

const CARDS_OPTIONS = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

export default function CheckoutPayment() {
  const dispatch = useDispatch();

  const isDesktop = useResponsive('up','lg')

  const { checkout } = useSelector((state) => state.product);

  const { cart ,total, discount, subtotal, shipping } = checkout;

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('결제방법을 선택해주세요!'),
  });

  const defaultValues = { 
    delivery: shipping,
    payment: 'card',
  };

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    watch,
  } = methods;

  const onSubmit = async () => {
    try {
      handleNextStep();
    } catch (error) {
      console.error(error);
    }
  };

  const [name, setname] = useState()

  useEffect(() => {
    if(cart.length === 1)
    setname(cart[0].name)
    else{
    setname(`${cart[0].name} 포함 ${cart.length}건`)
    }
  }, [cart])
  

  const pay = {
    price : fCurrency(total),
    payment : watch('payment'),
    names : name
  }



  const asdsa = () => {
    console.log(cart)
    console.log('sd',checkout)
    console.log('ssss',pay)
    console.log('지불수단',watch('payment'))
    console.log('이름', name)
  }


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
          >
            주소 다시 설정하기
          </Button>}
          </Stack>
          {/* <CheckoutDelivery onApplyShipping={handleApplyShipping} deliveryOptions={DELIVERY_OPTIONS} /> */}

          <CheckoutPaymentMethods cardOptions={CARDS_OPTIONS} paymentOptions={PAYMENT_OPTIONS} paymentOptions2={PAYMENT_OPTIONS2} />
          
          {isDesktop && <Button
            size="small"
            color="inherit"
            onClick={handleBackStep}
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          >
            돌아가기
          </Button>}
        </Grid>


        <Grid item xs={12} md={4}>
          <CheckoutBillingInfo onBackStep={handleBackStep} />

          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            onEdit={() => handleGotoStep(0)}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            주문하기
          </LoadingButton>
          <Button onClick={asdsa}>  sadsadsa</Button>
          <Pay pay={pay}/>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
