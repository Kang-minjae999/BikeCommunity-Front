import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LightModeIcon from '@mui/icons-material/LightMode';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Typography } from '@mui/material';


export default function Appweathercontent({weather ,weathername , weathericon}) {
  const [open, setOpen] = React.useState(true);

  const { id, name, temperature, main , description} = weather

  const [krname,setkrname] = useState('')


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        현재위치+현재시간
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