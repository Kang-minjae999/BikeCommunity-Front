import PropTypes from 'prop-types';
import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}cc`;
}
ShopFilterSidebarSliderDisplacement.propTypes = {
  field: PropTypes.object,
};
export default function ShopFilterSidebarSliderDisplacement({field}) {
  const [value, setValue] = useState([0, 0]);

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
      label: '1000cc',
    },
    {
      value: 1500,
      label: '1500cc',
    },
  ];

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        size='medium'
        marks={marks}
        value={field.value}
        getAriaLabel={() => 'Temperature range'}
        onChange={(event, newValue) => field.onChange(newValue) + setValue(newValue)}
        valueLabelFormat={valuetext}
        valueLabelDisplay="auto"
        step={100}
        max={1500}
        color='secondary'
      />
    </Box>
  );
}