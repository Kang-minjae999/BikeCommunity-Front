import PropTypes from 'prop-types';
import * as React from 'react';

// @mui
import { Typography, Box, Paper } from '@mui/material';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: '계정 관리',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    content: '#',
  },
  {
    label: '결제',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_payment.svg',
    content: '#',
  },
  {
    label: '배송',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_delivery.svg',
    content: '#',
  },
  {
    label: '상품파손',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_package.svg',
    content: '#',
  },
  {
    label: '교환/환불',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_refund.svg',
    content: '#',
  },
  {
    label: '환불',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_refund.svg',
    content: '#',
  },
];

// ----------------------------------------------------------------------

export default function FaqsCategory() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
    <Box
      sx={{
        mb: 3,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
      }}
    >
      {CATEGORIES.map((category) => (
        <MotionInView key={category.label} variants={varFade().in}>
          <CategoryCard category={category} />
        </MotionInView>
      ))}
    </Box>
    </>
  );
}

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
  category: PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
    content: PropTypes.string,
  }),
};

function CategoryCard({ category }) {
  
  const { label, icon, content } = category;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        height: 260,
        borderRadius: 2,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >

      <Image visibleByDefault disabledEffect src={icon} sx={{ mb: 2, width: 80, height: 80 }} 
      aria-describedby={id} onClick={handleClick}/>
      <Typography variant="subtitle2">{label}</Typography>

      <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Typography sx={{ p: 2 }}>{content}</Typography>
    </Popover>
    </Paper>
  );
}
