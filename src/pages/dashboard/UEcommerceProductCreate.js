import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UProductNewForm from '../../sections/@dashboard/used-e-commerce/UProductNewForm';
import UProductNewFormgear from '../../sections/@dashboard/used-e-commerce/UProductNewFormgear';
import UProductNewFormparts from '../../sections/@dashboard/used-e-commerce/UProductNewFormparts';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
/*   const dispatch = useDispatch(); */
  const { pathname } = useLocation();
  const { name } = useParams();
  const { products } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const currentProduct = products.find((product) => paramCase(product.name) === name);

  const ismoto = pathname.includes('moto');
  const isgear = pathname.includes('gear');
  const isparts = pathname.includes('parts');

/*   useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
 */
  return (
    <Page title="중고거래 / 새 상품 올리기">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? '중고 상품 올리기' : '상품 수정하기'}
          links={[
            { name: ''}
          ]}
          sx={{mt:2}}
        />

        {ismoto && <UProductNewForm isEdit={isEdit} currentProduct={currentProduct} />}
        {isgear && <UProductNewFormgear isEdit={isEdit} currentProduct={currentProduct} />}
        {isparts && <UProductNewFormparts isEdit={isEdit} currentProduct={currentProduct} />}
      </Container>
    </Page>
  );
}
