import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LightModeIcon from '@mui/icons-material/LightMode';
import { PropTypes } from 'prop-types';


export default function Appweathercontent2ride({weather,weathername , weathericon,namek}) {

  const { id, name, temperature, main ,description} = weather

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