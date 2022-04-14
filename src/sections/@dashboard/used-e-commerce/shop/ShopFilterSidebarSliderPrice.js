import PropTypes from 'prop-types';
import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}만원`;
}
ShopFilterSidebarSliderPrice.propTypes = {
  field: PropTypes.object,
};
export default function ShopFilterSidebarSliderPrice({field}) {
  const [value, setValue] = useState([0, 0]);

  const marks = [
    {
      value: 0,
      label: '0원',
    },
    {
      value: 1000,
      label: '1000만원',
    },
    {
      value: 2000,
      label: '2000만원',
    },
    {
      value: 3000,
      label: '3000만원',
    },
  ];

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        size='medium'
        marks={marks}
        value={field.value}
        onChange={(event, newValue) => field.onChange(newValue) + setValue(newValue)}
        valueLabelFormat={valuetext}
        valueLabelDisplay="auto"
        step={100}
        max={3000}
        color='secondary'
      />
    </Box>
  );
}