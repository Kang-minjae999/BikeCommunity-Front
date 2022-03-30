import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Stack, Link } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths'
import { varFade, MotionInView } from '../../components/animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  const linkToReport = `${PATH_DASHBOARD.blog.newReport}`;
  return (
    <Stack spacing={3}>
      <MotionInView variants={varFade().inUp}>
        <Typography variant="h4" sx={{mb:2}}>도움이 필요하신가요?</Typography>
        <Typography variant="body2">문의사항, 건의사항, 신고사항이 있으신가요?</Typography>
      </MotionInView>
      <MotionInView variants={varFade().inUp}>
      <Link to={linkToReport} color="inherit" component={RouterLink}>
      <Button fullWidth size="large" type="submit" variant="outlined" >
        접수하기
      </Button>
      </Link>
      </MotionInView>
    </Stack>
  );
}

