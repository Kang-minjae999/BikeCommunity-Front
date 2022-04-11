import sum from 'lodash/sum';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Card, Button, CardHeader, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../../../redux/slices/product';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
//
import useResponsive from '../../../../hooks/useResponsive';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();

  const isDesktop = useResponsive('up','lg')


  const navigate = useNavigate();

  const goback = () => {
    navigate(-1)
  }


  const { checkout } = useSelector((state) => state.product);

  const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
              <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
      {!isDesktop &&        
          <Button
          color="inherit"
          size="small"
          onClick={goback}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          sx={{mb:1}}
        >
          돌아가기
        </Button>}
        </Stack>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                목록
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems}건)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />
          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={cart}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="장바구니가 비었어요!"
              description="물건들을 장바구니에 담아보세요!"
            />
          )}
        </Card>

          {isDesktop &&        
          <Button
          color="inherit"
          onClick={goback}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          돌아가기
        </Button>}
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary
          enableDiscount
          total={total}
          discount={discount}
          subtotal={subtotal}
          onApplyDiscount={handleApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={cart.length === 0}
          onClick={handleNextStep}
        >
          이 상품들로 할게요!
        </Button>
      </Grid>
    </Grid>
  );
}
