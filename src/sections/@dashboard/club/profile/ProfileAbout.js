import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object,
};

export default function ProfileAbout({ profile }) {
  const {  role, company, school } = profile;

  return (
    <Card sx={{ ml: 1, mr:1 ,mt:1 }}>
      <Stack spacing={2} sx={{m:1}}>
        <Typography variant="body1">안녕하세요. 저희는 바이크 정비 수리 커스텀을 주로하는 일론머스크입니다.
        그대 기억이~~~~지난 사랑이~~~~</Typography>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body1">
            <Link component="span" variant="subtitle2" color="text.primary">
              경기도 군포시 산본동 보람타워 509호
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
