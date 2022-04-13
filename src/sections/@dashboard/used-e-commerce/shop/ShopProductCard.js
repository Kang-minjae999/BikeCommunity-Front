import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack, Divider } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { fyeardateTime, fToNow } from '../../../../utils/formatTime';
// components
import LabelProduct from '../../../../components/LabelProduct';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { id, title, brand, modelName, thumbnailImageURLs, address, createdDate, price, year, mileage, isGarage } =
    product;

  const linkTo = `${PATH_DASHBOARD.usedeCommerce.root}/product/detail/${id}`;

  return (
    <Card>
      {product && (
        <>
          <Link to={linkTo} component={RouterLink} underline="none">
            <Box sx={{ position: 'relative' }}>
              <Image alt={title} src={thumbnailImageURLs} ratio="1/1" />
              {/* {isGarage ? 
              <LabelProduct variant="subtitle2" color='primary' sx={{top:5, left:5, position:'absolute', zIndex:99}}>
                정비소
              </LabelProduct> : 
              <LabelProduct variant="subtitle2" color='primary' sx={{top:5, left:5, position:'absolute', zIndex:99}}>
                개인
              </LabelProduct>} */}
            </Box>

            <Stack spacing={2} sx={{ my: 1, mx: 2 }}>
              <Stack direction="row">
                <Typography variant="subtitle1" lineHeight={2} noWrap sx={{ color: 'text.primary' }}>
                  {title}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ mx: 2 }}>
                <Stack direction="column">
                  {isGarage ? (
                    <Typography variant="subtitle2" color="green">
                      정비소
                    </Typography>
                  ) : (
                    <Typography variant="subtitle2" color="blue">
                      개인
                    </Typography>
                  )}
                  <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                    {address}
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Stack direction="row">
                    <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                      {brand}/
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      {modelName}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                    {year}년식/{mileage}km
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {fCurrency(price)}원
                </Typography>
                <Typography variant="body2" component="span" sx={{ color: 'text.disabled' }}>
                  {fToNow(createdDate)}
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </>
      )}
    </Card>
  );
}
