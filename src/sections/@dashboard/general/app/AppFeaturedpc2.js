import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { CardContent, Box, Typography, Link } from '@mui/material';
// components
import Image from '../../../../components/Image';
import { varFade } from '../../../../components/animate';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0),
}));

// ----------------------------------------------------------------------
const item = {
  image: 'https://cdn.wadiz.kr/ft/images/green001/2020/0702/20200702111526553_69.jpg/wadiz/format/jpg/quality/80/optimize',
  title: '',
  description: '',
  type: '',
}
export default function AppFeaturedpc2() {
  const { image, title, description, type } = item;

  return (
    <Box sx={{ position: 'relative'}}>
      <CardContent
        sx={{
          bottom: 0,
          width: 1,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" component="div" sx={{ mb: 1, opacity: 0.48 }}>
            {type}
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Link component={RouterLink} to="#" color="inherit" underline="none">
            <Typography variant="h5" gutterBottom noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </CardContent>
      <OverlayStyle />
      <Image ratio='9/16' alt={title} src={image} />
    </Box>
  )
}
// ----------------------------------------------------------------------

