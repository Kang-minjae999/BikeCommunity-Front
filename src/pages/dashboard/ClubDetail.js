// routes
import { Container } from '@mui/material';
import Page from '../../components/Page';
import { AppClubProfile } from '../../sections/@dashboard/general/user';

// ----------------------------------------------------------------------

export default function ClubDetail() {
  
  return (
    <Page title="클럽">
      <Container maxWidth='xl' disableGutters>
        <AppClubProfile />
     </Container>
    </Page>
  );
}


