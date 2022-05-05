import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if(!(user?.phonenumber && user?.sex && user?.nickname && user?.name && user?.birthday)){
      alert('휴대폰 인증')
    } else{
      navigate('/dashboard/app')
    }
  }, [user ,navigate])

  return (
    <Page title="Login">
        {' '}
    </Page>
  );
}
