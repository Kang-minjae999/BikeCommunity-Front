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
import UProductNewForm from '../../sections/@dashboard/used-e-commerce/UProductNewForm';
import UProductNewFormgear from '../../sections/@dashboard/used-e-commerce/UProductNewFormgear';
import UProductNewFormparts from '../../sections/@dashboard/used-e-commerce/UProductNewFormparts';
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

  const ismoto = pathname.includes('moto');
  const isgear = pathname.includes('gear');
  const isparts = pathname.includes('parts');

  const [api, setApi] = useState();
  const [currentProduct, setcurrentProduct] = useState(null);

  useEffect(() => {
    if (ismoto) {
      setApi('biketrade');
    }
    if (isgear) {
      setApi('biketrade');
    }
    if (isparts) {
      setApi('biketrade');
    }
  }, [ismoto, isgear, isparts]);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/${api}/${id}`);

      if (isMountedRef.current) {
        setcurrentProduct(response.data.data);
      }
    } catch (error) {
      alert(error);
    }
  }, [isMountedRef, id, api]);

  useEffect(() => {
    if(id){
      getProduct();
    }
  }, [getProduct, id]);

  useEffect(() => {
    if (isEdit && currentProduct) {
      if (user?.nickname !== currentProduct?.nicknameOfSeller) {
        navigate('dashboard/app');
      }
    }
  }, [isEdit, currentProduct, user, navigate]);

  return (
    <Page title="중고거래 / 새 상품 올리기">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? '중고 상품 올리기' : '상품 수정하기'}
          links={[{ name: '' }]}
          sx={{ mt: 2 }}
        />

        {ismoto && <UProductNewForm isEdit={isEdit} currentProduct={currentProduct} />}
        {isgear && <UProductNewFormgear isEdit={isEdit} currentProduct={currentProduct} />}
        {isparts && <UProductNewFormparts isEdit={isEdit} currentProduct={currentProduct} />}
      </Container>
    </Page>
  );
}
