import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import Appweather from './Appweather';

// ----------------------------------------------------------------------
AppRidingHome.propTypes = {
  tab: PropTypes.string,
};
export default function AppRidingHome({tab}) {

  return (
    <>
    <Container>
    <Appweather />
    <GeneralMap tab={tab}/>
    </Container>
    </>
  );
}
