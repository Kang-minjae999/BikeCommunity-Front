import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
// form
// @mui
import { Container, Stack, Pagination, Divider, Box, Chip, Button, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Appmarketcategory2, Appmarketcategory2mobile } from '../../sections/@dashboard/general/shop';
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
// sections
import {
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
} from '../../sections/@dashboard/used-e-commerce/shop';
import useResponsive from '../../hooks/useResponsive';
import SimpleDialogDemo from './Generalmarketunewbutton';

// ------------------------------------------------------------

export default function GeneralMarketu() {
  const { themeStretch } = useSettings();

  const navigate = useNavigate()

  const { pathname } = useLocation();

  const {tab='', paging='', option=''} = useParams()

  const [page, setPage] = useState(parseInt(paging, 10))

  const isDesktop = useResponsive('up','lg')    

  const isMountedRef = useIsMountedRef();

  const dispatch = useDispatch();

  const { search } = useSelector((state) => state.product);

  const [products, setProducts] = useState([]);

  const [productsPC, setProductsPC] = useState([]);

  const [totalpage, settotalpage] = useState(0);

  const [pagenation, setpagenation] = useState(1);

  const [param, setparam] = useState('')


  useEffect(()=>{
    setPage(parseInt(paging, 10))
  }, [paging])

  const getAllProducts = useCallback(async () => {
    if(!option){
      try {
        const response = await axios.get(`/${tab}?page=${page}&size=2`);
        if (isMountedRef.current) {
          setProductsPC(response.data.data.content);
          setProducts(response.data.data.content);
          settotalpage(response.data.data.totalPages);
      }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.get(`/${tab}/search?page=${page}&size=2${option}`);
        if (isMountedRef.current) {
            setProductsPC(response.data.data.content);
            setProducts(response.data.data.content);
            settotalpage(response.data.data.totalPages);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [isMountedRef,tab, page, option]);

  useEffect(() => {
        getAllProducts();  
  }, [getAllProducts, param, tab]);

  const handleChange = ((event, value) => {
    setpagenation(value)
    if(pathname.includes('shop')){
     navigate(`/dashboard/shop/used/${tab}/${value-1}`)
    } else {
     navigate(`/dashboard/marketu/${tab}/${value-1}`)
    }
   }
  );

  const handleButton = (() => {
    navigate(`/dashboard/shop/used/${tab}/${page+1}`)
   }
  );


  const handleChip = ((item) => {
    if(isDesktop){
      if(tab !== 'etctrade'){
        navigate(`/dashboard/marketu/biketrade/0/&title=${item}`)           
      }
      if(tab === 'etctrade'){
        navigate(`/dashboard/marketu/etctrade/0/&title=${item}`)           
      }  
    }
    if(!isDesktop){
      if(tab !== 'etctrade'){
        navigate(`/dashboard/shop/used/biketrade/0/&title=${item}`)       
      }
      if(tab === 'etctrade'){
        navigate(`/dashboard/shop/used/etctrade/0/&title=${item}`)           
      }  
    }
   }
  );

  const handleReset = (() => {
    if(!isDesktop){
      navigate(`/dashboard/shop/used/${tab}/0`)
    }    
    if(isDesktop){
      navigate(`/dashboard/marketu/${tab}/0`)
    }
  }
  );

  
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };


  const handleRemoveSearch = (item) => {
    dispatch(deleteSearch(item));
  };

  
    return (
    <Page title="중고마켓">
          <Container maxWidth={themeStretch ? false : 'xl'}>
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
          {tab !== 'etctrade' &&
          <div>                
            {option && 
            <Button onClick={handleReset}><RestartAltIcon onClick={handleReset}/></Button>}
              <ShopFilterSidebar
                  isOpen={openFilter}
                  onOpen={handleOpenFilter}
                  onClose={handleCloseFilter}
              /></div>}
          {((tab === 'etctrade') && option) &&
              <Button onClick={handleReset}><RestartAltIcon onClick={handleReset}/></Button>}
          </Stack>
        </Stack>
        <Box sx={{whiteSpace: 'nowrap',overflowX: 'auto', width:'100%'}}>
          {search.map((item) => (<Chip key={item} label={item} onClick={() => handleChip(item)} onDelete={() => handleRemoveSearch(item)} sx={{mr:1}}/>))}
        </Box>  
        <Divider sx={{mt:1, mb:1}} />
        <Appmarketcategory2/>
          <Divider sx={{mt:1, mb:2}} />

        <ShopProductList products={productsPC} loading={!products.length} />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          >
        <Pagination hideNextButton hidePrevButton showFirstButton={false} showLastButton={false} count={totalpage} page={pagenation} onChange={handleChange} shape="rounded" color="primary" size="large" sx={{mt:2}}/>
        </Stack>
        </>}
        
        {!isDesktop && 
        <>
        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
            <Stack direction="row" spacing={1} flexShrink={0}
            justifyContent="space-between" sx={{ my: 1 }}>
              <Typography variant='h6'>중고거래</Typography>
                {tab !== 'etctrade' &&
                <div>
                {option && 
                <Button onClick={handleReset}><RestartAltIcon onClick={handleReset}/></Button>}
                <ShopFilterSidebar
                  isOpen={openFilter}
                  onOpen={handleOpenFilter}
                  onClose={handleCloseFilter}
                /></div>}
               {((tab === 'etctrade') && option) &&
              <Button onClick={handleReset}><RestartAltIcon onClick={handleReset}/></Button>}
            </Stack>
          <ShopProductSearch setparam={setparam} />
          <Box sx={{  whiteSpace: 'nowrap',
          overflowX: 'auto', width:'100%'}}>{search.map((item) => (<Chip key={item} label={item} onClick={() => handleChip(item)} onDelete={() => handleRemoveSearch(item)} sx={{mr:1, mb:1}}/>))}</Box>
          <SimpleDialogDemo />
        </Stack>

        <Divider sx={{mt:1, mb:1}} />
        <Appmarketcategory2mobile />
          <Divider sx={{ mb:2}} />

        <ShopProductList products={products} loading={!products.length} />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          >
        {totalpage > page && <Button onClick={handleButton} variant='outlined' sx={{my:4}}>더보기</Button>}
        </Stack>
        </>}      
        </Container>
    </Page>
  );
}

