import { useEffect, useState, useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Stack, Pagination, Divider, Box, Chip } from '@mui/material';
import { Appmarketcategory2 } from '../../sections/@dashboard/general/app';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// redux
import axios from '../../utils/axiossecondhand';
import { useDispatch, useSelector } from '../../redux/store';
import { deleteSearch } from '../../redux/slices/product';
// routes;
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider } from '../../components/hook-form';
// sections
import {
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
} from '../../sections/@dashboard/used-e-commerce/shop';
import useResponsive from '../../hooks/useResponsive';
import SimpleDialogDemo from './Generalmarketunewbutton';

// ------------------------------------------------------------

export default function GeneralMarketu() {
  const { themeStretch } = useSettings();
  
  const isDesktop = useResponsive('up','lg')

  const isMountedRef = useIsMountedRef();

  const dispatch = useDispatch();

  const { search } = useSelector((state) => state.product);

const [products, setProducts] = useState([]);


const [page, setpage] = useState(0);
const [totalpage, settotalpage] = useState(0);
const [pagenation, setpagenation] = useState(1);


const getAllProducts = useCallback(async () => {
  try {
    const response = await axios.get(`/biketrade?page=${page}&size=12`);

    if (isMountedRef.current) {
      setProducts(response.data.data.content);
      settotalpage(response.data.data.totalPages);
    }
  } catch (error) {
    console.error(error);
  }
}, [isMountedRef,page]);


const [param, setparam] = useState('')


  const getAllProducts2 = useCallback(async () => {
    try {
      const response = await axios.get(`/biketrade/search/?title=${param}`);
      if (isMountedRef.current) {
        setProducts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef,param]);

  useEffect(() => {
    if(!param){
      getAllProducts();
    }
    if(param){
      getAllProducts2();
    }
  }, [getAllProducts, getAllProducts2, param]);

  

  const handleChange = useCallback(
    (event, value) => {
      setpagenation(value);
      setpage(value - 1);
      getAllProducts(page);
    },
    [getAllProducts, page]
  );


  // -----------------------------------------------------------

  const defaultValues = {
    gearbox: null,
    displacement: null,
    isCrash: null,
    address: undefined,
    modelName: undefined,
    year: undefined,
    mileage: null,
    price: null,
    nego: null,
    trade: null,
    tradeModel: undefined,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset } = methods;
  
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    reset();
    handleCloseFilter();
  };

  const handleRemoveSearch = (item) => {
    dispatch(deleteSearch(item));
  };
  
    return (
    <Page title="중고마켓">
          <Container maxWidth={themeStretch ? false : 'lx'}>
          {isDesktop && <HeaderBreadcrumbs
          heading='Secondhand Market'
          links={[
            { name: '' },

          ]} />}

       {isDesktop && 
        <>
        <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
             <>
            <ShopProductSearch setparam={setparam} />      
            <SimpleDialogDemo />
            </>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider  methods={methods} >
              <ShopFilterSidebar
                onResetAll={handleResetFilter}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
              />
            </FormProvider>
            <ShopProductSort />
          </Stack>
        </Stack>
        <Box sx={{whiteSpace: 'nowrap',overflowX: 'auto', width:'100%'}}>
          {search.map((item) => (<Chip key={item} label={item} onClick={() => setparam(item)} onDelete={() => handleRemoveSearch(item)} sx={{mr:1}}/>))}
        </Box>  
        </>}
        
        {!isDesktop && 
        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
            <Stack direction="row" spacing={1} flexShrink={0}
            justifyContent="space-between" sx={{ my: 1 }}>
              <FormProvider methods={methods}>
                <ShopFilterSidebar
                  onResetAll={handleResetFilter}
                  isOpen={openFilter}
                  onOpen={handleOpenFilter}
                  onClose={handleCloseFilter}
                />
              </FormProvider> 
              <ShopProductSort />
            </Stack>
          <ShopProductSearch setparam={setparam} />
          <Box sx={{  whiteSpace: 'nowrap',
          overflowX: 'auto', width:'100%'}}>{search.map((item) => (<Chip key={item} label={item} onClick={() => setparam(item)} onDelete={() => handleRemoveSearch(item)} sx={{mr:1, mb:1}}/>))}</Box>
          <SimpleDialogDemo />
        </Stack>}

        <Divider sx={{mt:1, mb:1}} />
        <Appmarketcategory2/>
          <Divider sx={{mt:1, mb:2}} />

        <ShopProductList products={products} loading={!products.length} />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          >
        <Pagination count={totalpage} page={pagenation} onChange={handleChange} shape="rounded" color="primary" size="large" sx={{mt:2}}/>
        </Stack>      
        </Container>
    </Page>
  );
}

