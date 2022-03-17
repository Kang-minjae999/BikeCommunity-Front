import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography } from '@mui/material';
// _mock_
import { _carouselsMembers } from '../../_mock';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { CarouselArrows } from '../../components/carousel';
import SocialsButton from '../../components/SocialsButton';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutTeamapp() {
  const carouselRef = useRef(null);
  const theme = useTheme();

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
    ],
  };
  
  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Container sx={{ pb: 2, textAlign: 'flex-start' }}>
      <MotionInView variants={varFade().inUp}>
        <Typography variant="h3" sx={{ml:3, mt: 2 ,mb: 1 }}>
          Best
        </Typography>
      </MotionInView>
      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}  >
            {_carouselsMembers.map((member) => (
              <MotionInView key={member.id} variants={varFade().in} sx={{ px: 1.5, py: 1 }}>
                <MemberCard member={member} />
              </MotionInView>
            ))}
          </Slider>
        </CarouselArrows>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, role, avatar } = member;

  return (
    <Card key={name} sx={{ p: 1 }}>
      <Image src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
    </Card>
  );
}
