import PropTypes from 'prop-types';
import * as React from 'react';
import { Container } from '@mui/material';
import GeneralMap from '../../../../pages/dashboard/GeneralMap';
import Appweather from './Appweather';
// ----------------------------------------------------------------------
AppRidingHome.propTypes = {
  tab: PropTypes.string,
  userPo: PropTypes.object,
  weather1: PropTypes.object,
  weather2: PropTypes.object,
};

export default function AppRidingHome({ tab, userPo, weather1, weather2 }) {
  return (
    <>
      <Container>
        {weather1 && weather2 && <Appweather weather={weather1} weather2={weather2} />}
        {userPo && <GeneralMap tab={tab} userPo={userPo} />}
      </Container>
    </>
  );
}
