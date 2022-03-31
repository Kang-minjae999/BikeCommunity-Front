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
import Label from '../../../../components/Label';
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
      <Box sx={{ position: 'relative' }}>
        {address && (
          <Label
            color='success'
            variant="filled"
            sx={{
              top: 16,
              left: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {address}
          </Label>
        )}
        {year && <Label
            color='success'
            variant="filled"
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {year}
          </Label>}
          {mileage && 
          <Label
            color='success'
            variant="filled"
            sx={{
              top: 22,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {mileage}
          </Label>}
        <Image alt={title} src={thumbnailImageURLs} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="column" alignItems="center" justifyContent="center">
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
            {brand && (
              <Typography variant="subtitle2" >
                {brand}
              </Typography>
            )} 
            <Typography variant="body2"  >{modelName}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
            {price && (
              <Typography variant="subtitle2" >
                {fCurrency(price)}
              </Typography>
            )} 
            <Typography variant="body2" component="span" sx={{ color: 'text.disabled' }}>{fyeardateTime(createdDate)}</Typography>
          </Stack>
        </Stack>
      </Stack>
      </>}
    </Box>
  );
}
