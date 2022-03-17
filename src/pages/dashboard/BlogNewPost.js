// @mui
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogNewDingstaForm, BlogNewNoticeForm, BlogNewPostForm } from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();

  const isnotice = pathname.includes('notice');
  const ispost = pathname.includes('post');
  const isdingsta = pathname.includes('dingsta');


  return (
    <Page title={(isdingsta ?'딩스타': '')}>
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading={(isdingsta ?'딩스타그램': '')}
          links={[
            { name: '' },
          ]}
          sx={{mt:2}}
        />

        {isnotice && <BlogNewNoticeForm />}
        {ispost && <BlogNewPostForm />}
        {isdingsta && <BlogNewDingstaForm />}
      </Container>
    </Page>
  );
}
