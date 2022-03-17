import PropTypes from 'prop-types';
// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
// redux
import { useSelector } from '../../../../redux/store';
// components
import Iconify from '../../../../components/Iconify';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {
  onBackStep: PropTypes.func,
};

export default function CheckoutBillingInfo({ onBackStep }) {
  const { checkout } = useSelector((state) => state.product);

  const { billing } = checkout;

  const {Address, Zipcode, Displayname, Phonenumber} = billing

  console.log(billing)
  

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="배송지정보"
        action={
          <Button size="small" startIcon={<Iconify icon={'eva:edit-fill'} />} onClick={onBackStep}>
            수정하기
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {Displayname}&nbsp;
          {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            ({billing?.addressType})
          </Typography> */}
        </Typography>

        <Typography variant="body2" gutterBottom>
         {Address} / {Zipcode}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {Phonenumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
