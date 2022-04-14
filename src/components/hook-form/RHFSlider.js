import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Slider } from '@mui/material';

// ----------------------------------------------------------------------

RHFSlider.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default function RHFSlider({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Slider
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          size='medium'
          valueLabelDisplay="auto"
          step={1000}
          max={50000}
          color='secondary'
          {...other}
        >
          {children}
        </Slider>
      )}
    />
  );
}
