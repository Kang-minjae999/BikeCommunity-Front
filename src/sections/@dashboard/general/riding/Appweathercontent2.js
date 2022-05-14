import * as React from 'react';
import { PropTypes } from 'prop-types';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

Appweathercontent2.propTypes = {
  weather: PropTypes.object,
  weathername: PropTypes.string,
  weathericon: PropTypes.any,
};

export default function Appweathercontent2({weather, weathername , weathericon}) {

  const {temperature} = weather

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          현재위치+3시간
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <DeviceThermostatIcon />
        </ListItemIcon>
        <ListItemText primary={temperature} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
         {weathericon}
        </ListItemIcon>
        <ListItemText primary={weathername} />
      </ListItemButton>
    </List>
  );
}