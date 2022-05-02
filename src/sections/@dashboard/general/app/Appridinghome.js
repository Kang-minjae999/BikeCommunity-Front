import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import Appweather from './Appweather';

// ----------------------------------------------------------------------
AppRidingHome.propTypes = {
  tab: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
  userPo: PropTypes.object,
};
export default function AppRidingHome({tab, state, setState, userPo}) {

  return (
    <>
    <Container>
    <Appweather />
    <GeneralMap tab={tab} state={state} setState={setState} userPo={userPo}/>
    </Container>
    </>
  );
}
