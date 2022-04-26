import { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import axios from '../../utils/axiossecondhand';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../sections/@dashboard/garage/ProductNewForm';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { id = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const [api, setApi] = useState('garage');
  const [currentProduct, setcurrentProduct] = useState(null);

  const getProduct = useCallback(async () => {
    if(isEdit){
    try {
      const response = await axios.get(`/${api}/${id}`);
      if (isMountedRef.current) {
        setcurrentProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }}, [isMountedRef, id, api, isEdit]);

  useEffect(() => {
    if(api){
      if(id){
        getProduct();
      }
    }
  }, [getProduct, id, api]);

  useEffect(() => {
    if (isEdit && currentProduct) {
      if (user?.nickname !== currentProduct?.nicknameOfSeller) {
        navigate('dashboard/app');
      }
    }
  }, [isEdit, currentProduct, user, navigate]);

  return (
    <Page title="신차 올리기">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? '신차 올리기' : '상품 수정하기'}
          links={[{ name: '' }]}
          sx={{ mt: 2 }}
        />
        <ProductNewForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
