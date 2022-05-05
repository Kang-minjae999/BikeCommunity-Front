import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link } from '@mui/material';
// _mock_
import { _appFeatured } from '../../../../_mock';
import useResponsive from '../../../../hooks/useResponsive';
// components
import Image from '../../../../components/Image';
import { MotionContainer, varFade } from '../../../../components/animate';
import { CarouselDots, CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.32),
}));

// ----------------------------------------------------------------------

export default function AppFeatured() {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? _appFeatured.length - 1 : 0);

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed:4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      left:0,
      right:0,  
      bottom: 14,
      position: 'absolute',
    }),
  };
  const SliderItem = [{
    id: '1',
    title: 'RIDERTOWN',
    description: 'RIDERTOWN',
    image: 'https://cdn.imweb.me/upload/S2020112077da751d9e507/725fca31db204.jpg',
    },
    {
      id: '2',
      title: 'RIDERTOWN',
      description: 'RIDERTOWN',
      image: 'https://pictures.topspeed.com/IMG/crop/201904/2020-bmw-s-1000-rr-16_1600x0w.jpg',
    }
  ];

  return (
    <Box sx={{mb:2}}>
      <Slider ref={carouselRef} {...settings}>
        {SliderItem.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Slider>
    </Box>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  const { image, title, description } = item;
  const isDesktop = useResponsive('up', 'lg')

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: 0,
          width: 1,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        {isDesktop && 
        <m.div variants={varFade().inRight}>
          <Link component={RouterLink} to="#" color="inherit" underline="none">
            <Typography variant="h5" gutterBottom noWrap>
             {title}
            </Typography>
          </Link>
        </m.div>}
        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
           {description}
          </Typography>
        </m.div>
      </CardContent>
      <OverlayStyle />
      <Image ratio='21/9' alt={title} src={image}/>
    </Box>
  );
}
