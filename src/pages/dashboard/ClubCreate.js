// @mui
import { Container } from '@mui/material';
// routes
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../sections/@dashboard/club/ProductNewForm';

// ----------------------------------------------------------------------

export default function ClubCreate() {
  const currentProduct = null;

  return (
    <Page title="클럽생성">
      <Container maxWidth='xl' sx={{mt:2}}>
        <HeaderBreadcrumbs
          heading='클럽 만들기'
          links={[
            '',
          ]}
        />

        <ProductNewForm currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
