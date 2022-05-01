import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Typography } from '@mui/material';


export default function Appweathercontent2ride({weather ,weathername , weathericon, namek}) {
  const [open, setOpen] = React.useState(true);

  const { id, name, temperature, main , description} = weather

  const [krname,setkrname] = useState('')


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"

    >
      <ListItemButton>
        <ListItemText secondary='현재시간' sx={{fontSize:12}}/>
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