// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack} from '@mui/material';
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 200,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle spacing={5}>
          <div>
            <TextAnimate text="고객센터" sx={{ color: 'primary'  }} variants={varFade().inRight} />
            <br />
          </div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
