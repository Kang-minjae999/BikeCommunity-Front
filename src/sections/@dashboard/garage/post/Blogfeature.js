import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useState, useRef } from 'react';
// @mui
import { useTheme,  } from '@mui/material/styles';
import {  Box } from '@mui/material';
// _mock_
// components
import Image from '../../../../components/Image';
import { CarouselDots } from '../../../../components/carousel';


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
  item: PropTypes.string,
};

function CarouselItem({ item}) {
  return (
    <Box sx={{ position: 'relative'}}>
      <Image ratio='1/1' alt={item} src={item} />
    </Box>
  );
}
