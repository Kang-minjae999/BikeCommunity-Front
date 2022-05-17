import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { PropTypes } from 'prop-types';

Appweathercontent2ride.propTypes = {
  weather: PropTypes.object,
  weathername: PropTypes.string,
  weathericon: PropTypes.any,
};

export default function Appweathercontent2ride({weather, weathername , weathericon}) {

  const { temperature } = weather

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemText secondary='3시간뒤'/>
      </ListItemButton>
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