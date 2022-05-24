import PropTypes from 'prop-types';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}시`;
}

CardSliderOpenTime.propTypes = {
  field: PropTypes.object,
};

export default function CardSliderOpenTime({field}) {

  const marks = [
    {
      value: 0,
      label: '0시',
    },
    {
      value: 6,
      label: '6시',
    },
    {
      value: 12,
      label: '12시',
    },
    {
      value: 18,
      label: '18시',
    },    
    {
      value: 24,
      label: '24시',
    },
  ];


  return (
    <Box sx={{ width:'100%' }}>
      <Slider
        size='medium'
        marks={marks}
        value={field.value}
        onChange={(event, newValue) => field.onChange(newValue)}
        onChangeCommitted={(event, newValue) => field.onChange(newValue)}
        valueLabelFormat={valuetext}
        valueLabelDisplay="auto"
        step={1}
        max={24}
        color='secondary'
      />
    </Box>
  );
}