import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography, Grid } from '@mui/material';
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


  return (
    <Container sx={{ pb: 2, textAlign: 'center' }}>
      <Grid container spacing={2}>
            {_carouselsMembers.map((member) => (
            <Grid item xs={6} key={member.id}><MemberCard member={member}/></Grid>))}
       </Grid>
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
    <Card key={name} sx={{height:'30vh', width:'20vh', p: 1 }}>
      <Image src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
        {name}
      </Typography>
    </Card>
  );
}
