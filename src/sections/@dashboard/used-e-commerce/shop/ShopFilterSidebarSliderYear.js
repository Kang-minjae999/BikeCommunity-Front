import PropTypes from 'prop-types';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}km`;
}
ShopFilterSidebarSliderYear.propTypes = {
  field: PropTypes.object,
  value: PropTypes.array,
  setValue: PropTypes.func,
};
export default function ShopFilterSidebarSliderYear({field, value, setValue}) {

  const marks = [
    {
      value: 1992,
      label: '1992년식',
    },
    {
      value: 2002,
      label: '2002년식',
    },
    {
      value: 2012,
      label: '2012년식',
    },
    {
      value: 2022,
      label: '2022년식',
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
        step={1}
        min={1992}
        max={2022}
        color='secondary'
      />
    </Box>
  );
}