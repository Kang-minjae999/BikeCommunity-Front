import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}km`;
}

export default function ShopFilterSidebarSlider() {
  const [value, setValue] = useState([0, 50000]);

  const handleChange = (event, newValue) => {
    setValue(newValue)
    console.log(newValue)
  };
  const marks = [
    {
      value: 0,
      label: '0km',
    },
    {
      value: 10000,
      label: '1만km',
    },
    {
      value: 20000,
      label: '2만km',
    },
    {
      value: 50000,
      label: '5만km',
    },
  ];

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        size='medium'
        marks={marks}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1000}
        max={50000}
        color='secondary'
      />
    </Box>
  );
}