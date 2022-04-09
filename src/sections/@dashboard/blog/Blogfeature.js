import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link } from '@mui/material';
// _mock_
import { _appFeatured } from '../../../_mock';
// components
import Image from '../../../components/Image';
import { MotionContainer, varFade } from '../../../components/animate';
import { CarouselDots, CarouselArrows } from '../../../components/carousel';

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
Blogfeature.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function Blogfeature({post}) {
  const {postImageURLs} = post
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? postImageURLs.length - 1 : 0);

  const settings = {
    speed: 400,
    dots: true,
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      left: 0,
      right: 0,
      bottom: -20,
      position: 'absolute',
      color:'text.primary'
    }),
  };


  return (
    <>
      <Slider ref={carouselRef} {...settings}>
        {postImageURLs.map((app, index) => (
          <CarouselItem key={index} item={app} index={index} isActive={index === currentIndex} />
        ))}
      </Slider>
    </>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.string,
  index: PropTypes.number,
};

function CarouselItem({ item, isActive, index }) {
  return (
    <Box sx={{ position: 'relative'}}>
      <Image ratio='1/1' alt={item} src={item} />
    </Box>
  );
}
