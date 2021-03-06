import PropTypes from 'prop-types';
// @mui
import { Box, Grid } from '@mui/material';
// components
import { SkeletonProductItem } from '../../../../components/skeleton';
//
import ShopProductCard from './ShopProductCard';

// ----------------------------------------------------------------------

ShopProductListmobile.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default function ShopProductListmobile({ products, loading }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {(loading ? [...Array(12)] : products).map((product, index) =>
        product ? <ShopProductCard key={product.id} product={product} /> : <SkeletonProductItem key={index} />
      )}

      <Grid container spacing={1}>
      {(loading ? [...Array(12)] : products).map((product, index) =>
        product ? <Grid item xs={6} key={product.id}><ShopProductCard key={product.id} product={product} /></Grid>: <SkeletonProductItem key={index} />
      )}
      </Grid>
    </Box>
  );
}
