// @mui
import { Stack, Typography, Link } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function NavbarDocs() {

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
        <Typography variant="subtitle2" color='text.primary'>
          <Link href={PATH_PAGE.faqs} color='text.primary'>
          고객센터
          <br/><br/><br/>
          </Link>
        </Typography>
    </Stack>
  );
}
