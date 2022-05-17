import PropTypes from 'prop-types';
import { useParams } from 'react-router';
// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '../../../../components/skeleton';
//
import ShopProductCard from './ShopProductCard';
import ShopProductCardEtc from './ShopProductCardEtc';

// ----------------------------------------------------------------------

ShopProductList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default function ShopProductList({ products, loading }) {
  const {tab } = useParams()

  return (
    <>
    {tab !== 'etctrade' 
    ?
    <Box
      sx={{
        display: 'grid',
        gap: 1,
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {(loading ? [...Array(12)] : products).map((product, index) =>
        product ? <ShopProductCard key={product.title} product={product} />
        :<SkeletonProductItem key={index} />
      )}
    </Box>
    :
    <Box
    sx={{
      display: 'grid',
      gap: 1,
      gridTemplateColumns: {
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      },
    }}
  >
    {(loading ? [...Array(12)] : products).map((product, index) =>
      product ? <ShopProductCardEtc key={product.title} product={product} />
      :<SkeletonProductItem key={index} />
    )}
  </Box>}
    </>
  );
}
