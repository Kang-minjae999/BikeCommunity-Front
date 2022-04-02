import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import axios from '../../utils/axiossecondhand';
import { useDispatch, useSelector } from '../../redux/store';
import { addHeartUsed, addCart, onGotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// redux
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/used-e-commerce/product-details';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '중고거래 방법 1',
    description: '일론머스크',
    icon: 'ic:round-verified',
  },
  {
    title: '중고거래 방법 2',
    description: '일론머스크',
    icon: 'eva:clock-fill',
  },
  {
    title: '중고거래 방법 3',
    description: '일론머스크',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

export default function UEcommerceProductDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { id = '' } = useParams();
  
  const isMountedRef = useIsMountedRef();
  
  const [product, setProduct] = useState();

  const [error, setError] =useState()

  const [value, setValue] = useState('1')

  const getAllProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/biketrade/${id}`);
  
      if (isMountedRef.current) {
        setProduct(response.data.data);
        console.log(product)
      }
    } catch (error) {
      setError(error)
    }
  }, [isMountedRef,id]);
  
  useEffect(() => {
      getAllProduct();
  }, [getAllProduct]);


  const handleAddHeart = (product) => {
    dispatch(addHeartUsed(product));
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page title="중고거래">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="중고거래"
          links={[
            { name: '' }
          ]}
          sx={{mt:2}}
        />

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                 {/* <ProductDetailsCarousel images={product?.bikeImageURLs} /> */} <Box/>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                   <ProductDetailsSummary
                    product={product}
                    onAddHeart={handleAddHeart}
                    onGotoStep={handleGotoStep}
                  /> 
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <IconWrapperStyle>
                      <Iconify icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Description" />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.content} />
                  </Box>
                </TabPanel>
              </TabContext>
            </Card> 
          </>
        )}

        {!product && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}
