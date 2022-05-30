import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../sections/@dashboard/club/ProductNewForm';
import axios from '../../utils/axios';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function ClubEdit() {
  const { pathname } = useLocation();
  const isMountedRef = useIsMountedRef();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');

  const [currentProduct, setcurrentProduct] = useState(null);

  const getClub = useCallback(async () => {
    if(isEdit){
    try {
      const response = await axios.get(`/club-service/${id}`);
      if (isMountedRef.current) {
        setcurrentProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }}, [isMountedRef, id, isEdit]);

  useEffect(() => {
      if(id){
        getClub();
      }
  }, [getClub, id]);

  useEffect(() => {
    if (isEdit && currentProduct) {
      if (user?.nickname !== currentProduct?.nicknameOfCaptain) {
        navigate('dashboard/app');
      }
    }
  }, [isEdit, currentProduct, user, navigate]);

  return (
    <Page title="클럽생성">
      <Container maxWidth='xl' sx={{mt:2}}>
        <HeaderBreadcrumbs
          heading={!isEdit ? '클럽 만들기' : '클럽 수정하기'}
          links={[
            { name: !isEdit ? '' : '' },
          ]}
        />

        <ProductNewForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
