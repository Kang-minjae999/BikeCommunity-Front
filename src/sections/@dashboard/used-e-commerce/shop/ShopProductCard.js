import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { fyeardateTime } from '../../../../utils/formatTime';
// components
import LabelProduct from '../../../../components/LabelProduct';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { id, title, brand, modelName, thumbnailImageURLs, address, createdDate, price, year, mileage } = product;

  const linkTo = `${PATH_DASHBOARD.usedeCommerce.root}/product/detail/${id}`;

  return (
    <Box>
      {product &&
        <>
      <Link to={linkTo} component={RouterLink}>
      <Box sx={{ position: 'relative' }}>
          <LabelProduct
            color='info'
            variant="filled"
            sx={{
              top: 8,
              left: 8,
              zIndex: 9,
              position: 'absolute',
              
            }}
          >
            {address}
          </LabelProduct>
          <Box sx={{
              top: 8,
              right: 8,
              zIndex: 9,
              position: 'absolute',
            }}>
          <LabelProduct
            color='info'
            variant="filled" >
            {year}년식
          </LabelProduct>
          <LabelProduct
            color='info'
            variant="filled">
            {mileage}km
          </LabelProduct>
          </Box>
        <Image alt={title} src={thumbnailImageURLs} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ my:2 }}>
      <Typography variant="subtitle2" noWrap>
            {title}
        </Typography>
        <Stack direction="column" alignItems="center" justifyContent="center">
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <Typography variant="subtitle2" >
                {brand}
              </Typography>
            <Typography variant="body2" >{modelName}</Typography>
          </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <Typography variant="subtitle2" >
                {price}원
              </Typography>
            <Typography variant="body2" component="span" sx={{ color: 'text.disabled' }}>{fyeardateTime(createdDate)}</Typography>
        </Stack>
        </Stack>
      </Stack>
        </Link>
      </>}
    </Box>
  );
}
