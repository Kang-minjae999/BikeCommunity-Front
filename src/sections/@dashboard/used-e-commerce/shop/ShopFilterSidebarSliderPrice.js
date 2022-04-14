import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}만원`;
}

export default function ShopFilterSidebarSliderPrice() {
  const [value, setValue] = useState([0, 5000]);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
  const marks = [
    {
      value: 0,
      label: '0원',
    },
    {
      value: 1000,
      label: '천만원',
    },
    {
      value: 2500,
      label: '2천5백만원',
    },
    {
      value: 5000,
      label: '5천만원',
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
        max={5000}
        color='secondary'
      />
    </Box>
  );
}