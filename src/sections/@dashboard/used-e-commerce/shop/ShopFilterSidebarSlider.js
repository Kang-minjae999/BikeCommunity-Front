import PropTypes from 'prop-types';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}km`;
}
ShopFilterSidebarSlider.propTypes = {
  field: PropTypes.object,
  value: PropTypes.array,
  setValue: PropTypes.func,
};
export default function ShopFilterSidebarSlider({field, value, setValue}) {

  const marks = [
    {
      value: 0,
      label: '0cc',
    },
    {
      value: 10000,
      label: '10000km',
    },
    {
      value: 20000,
      label: '20000km',
    },
    {
      value: 30000,
      label: '30000km',
    },
  ];


  return (
    <Box sx={{ width: 300 }}>
      <Slider
        size='medium'
        marks={marks}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        onChangeCommitted={(event, newValue) => field.onChange(newValue)}
        valueLabelFormat={valuetext}
        valueLabelDisplay="auto"
        step={1000}
        max={30000}
        color='secondary'
      />
    </Box>
  );
}