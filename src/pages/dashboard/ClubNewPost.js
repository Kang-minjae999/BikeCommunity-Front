// @mui
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogNewDingstaForm } from '../../sections/@dashboard/clubblog';

// ----------------------------------------------------------------------

export default function ClubNewPost() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  
  const isdingsta = pathname.includes('dingsta');

  return (
    <Page title={(isdingsta ? '클럽 딩스타그램' : '')}>
      <Container maxWidth={themeStretch ? false : 'md'}>
        <HeaderBreadcrumbs
          heading={(isdingsta ? '클럽 딩스타그램' : '')}
          links={[
            { name: '' },
          ]}
          sx={{ mt: 2 }}
        />
        {isdingsta && <BlogNewDingstaForm />}
      </Container>
    </Page>
  );
}
