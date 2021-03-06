import { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import axios from '../../utils/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UProductNewForm from '../../sections/@dashboard/used-e-commerce/UProductNewForm';
import UProductNewFormgear from '../../sections/@dashboard/used-e-commerce/UProductNewFormgear';
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

  const ismoto = pathname.includes('newmoto');
  const isgear = pathname.includes('newetc');

  const [api, setApi] = useState();
  const [currentProduct, setcurrentProduct] = useState(null);

  useEffect(() => {
    if (ismoto) {
      setApi('biketrade');
    }
    if (isgear) {
      setApi('etctrade');
    }
  }, [ismoto, isgear]);

  const getProduct = useCallback(async () => {
    if(isEdit){
    try {
      const response = await axios.get(`/secondhand-trade-service/${api}/${id}`);
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
    <Page title="???????????? / ??? ?????? ?????????">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? '?????? ?????? ?????????' : '?????? ????????????'}
          links={[{ name: '' }]}
          sx={{ mt: 2 }}
        />

        {ismoto && <UProductNewForm isEdit={isEdit} currentProduct={currentProduct} />}
        {isgear && <UProductNewFormgear isEdit={isEdit} currentProduct={currentProduct} />}
      </Container>
    </Page>
  );
}
