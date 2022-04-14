import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}cc`;
}

export default function ShopFilterSidebarSliderDisplacement() {
  const [value, setValue] = useState([0, 2000]);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
  const marks = [
    {
      value: 0,
      label: '0cc',
    },
    {
      value: 500,
      label: '500cc',
    },
    {
      value: 1000,
      label: '1500cc',
    },
    {
      value: 2000,
      label: '2000cc',
    },
  ];

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        size='medium'
        marks={marks}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={100}
        max={2000}
        color='secondary'
      />
    </Box>
  );
}