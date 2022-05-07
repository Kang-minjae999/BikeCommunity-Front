// @mui
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogNewAskForm,BlogNewCardForm, BlogNewPostForm } from '../../sections/@dashboard/garage/newpost';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();

  const isAsk = pathname.includes('ask');
  const isPost = pathname.includes('post');
  const isCard = pathname.includes('card');


  return (
    <Page title={(isAsk ?'정비질문': '정비소')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={(isAsk ?'정비질문': '정비소')}
          links={[
            { name: '' },
          ]}
          sx={{mt:2}}
        />

        {isAsk && <BlogNewAskForm />}
        {isPost && <BlogNewPostForm />}
        {isCard && <BlogNewCardForm />}
      </Container>
    </Page>
  );
}
