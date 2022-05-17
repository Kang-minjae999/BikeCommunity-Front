import PropTypes from 'prop-types';
// @mui
import { Box, Avatar, Typography, Stack } from '@mui/material';
// utils
import { fyeardateTime } from '../../../utils/formatTime';

// --------------------------------------------------------------

BlogPostHero.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostHero({ post }) {
  const { title, createdDate } = post;

  return (
    <Stack
    direction="column"
    justifyContent="space-between"
    alignItems="center"
    spacing={2}
  >
      <Typography variant="h3" sx={{ color: 'primary', mt:2 , ml:2, mr:2} }>
      {title}
      </Typography>
      <Stack
        direction="row-reverse"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt:2 , ml:2, mr:2 , mb:2}}>
      <Avatar alt='라이더타운' src='https://en.pimg.jp/068/513/753/1/68513753.jpg' sx={{ width: 48, height: 48 , mr:2}} />
      <Box>
        <Typography variant="subtitle1" sx={{ color: 'secondary' }}>
         라이더타운
        </Typography>
        <Typography variant="body2" sx={{ color: 'secondary' }}>
        {fyeardateTime(createdDate)}
        </Typography>
      </Box>
    </Box>
    </Stack>
    </Stack>
  );
}
