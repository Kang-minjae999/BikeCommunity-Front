import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography } from '@mui/material';
// _mock_
import { _carouselsMembers } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { CarouselArrows } from '../../../../components/carousel';
import SocialsButton from '../../../../components/SocialsButton';
import { MotionInView, varFade } from '../../../../components/animate';

// ----------------------------------------------------------------------

export default function Appmobileshopitem() {
  const carouselRef = useRef(null);
  const carouselRef2 = useRef(null);
  const theme = useTheme();

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 2,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Container sx={{ pb: 2, textAlign: 'flex-start' }}>
      <Box sx={{ position: 'relative' }}>
          <Slider ref={carouselRef} {...settings}  >
            {_carouselsMembers.map((member) => (
              <MotionInView key={member.id} variants={varFade().in} sx={{ px: 1.5, py: 1 }}>
                <MemberCard member={member} />
              </MotionInView>
            ))}
          </Slider>
      </Box>
        <Box sx={{ position: 'relative' }}>
          <Slider ref={carouselRef2} {...settings}  >
            {_carouselsMembers.map((member) => (
              <MotionInView key={member.id} variants={varFade().in} sx={{ px: 1.5, py: 1 }}>
                <MemberCard member={member} />
              </MotionInView>
            ))}
          </Slider>
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
    <Card key={name} sx={{height:'20vh', width:'130px', p: 1 }}>
      <Image src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
        {name}
      </Typography>
    </Card>
  );
}
