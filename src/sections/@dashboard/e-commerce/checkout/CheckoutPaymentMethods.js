import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Radio,
  Stack,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel,
  Grid,
} from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'center',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

CheckoutPaymentMethods.propTypes = {
  paymentOptions: PropTypes.array,
  paymentOptions2: PropTypes.array,
  cardOptions: PropTypes.array,
};

export default function CheckoutPaymentMethods({ paymentOptions, cardOptions, paymentOptions2 }) {
  const { control } = useFormContext();

  const isDesktop = useResponsive('up', 'sm');

  return (
    <>
      <CardHeader title="결제수단" sx={{mb:2}}/>
        <Controller
          name="payment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
              <RadioGroup {...field}>
                  {paymentOptions.map((method) => {
                    const { value, title, icons, description } = method;

                    const hasChildren = value === 'credit_card';

                    const selected = field.value === value;

                    return (
                      <OptionStyle
                        key={title}
                        sx={{
                          ...(selected && {
                            boxShadow: (theme) => theme.customShadows.z20,
                          }),
                          ...(hasChildren && { flexWrap: 'wrap' }),
                          mb:1
                        }}
                      >
                        <FormControlLabel
                          value={value}
                          control={<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />}
                          label={
                            <Box sx={{ ml: 1 }}>
                              <Typography variant="subtitle2">{title}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {description}
                              </Typography>
                            </Box>
                          }
                          sx={{ flexGrow: 1, py: 3 }}
                        />
                          {isDesktop && (<Stack direction="row" spacing={1} flexShrink={0}>
                            {icons.map((icon) => (
                              <Image key={icon} alt="logo card" src={icon} />
                            ))}
                          </Stack>)}
                      </OptionStyle>
                    );
                  })}
              </RadioGroup></Grid>
              <Grid item xs={6} md={6}>
              <RadioGroup {...field}>
                  {paymentOptions2.map((method) => {
                    const { value, title, icons, description } = method;

                    const hasChildren = value === 'credit_card';

                    const selected = field.value === value;

                    return (
                      <OptionStyle
                        key={title}
                        sx={{
                          ...(selected && {
                            boxShadow: (theme) => theme.customShadows.z20,
                          }),
                          ...(hasChildren && { flexWrap: 'wrap' }),
                          mb:1
                        }}
                      >
                        <FormControlLabel
                          value={value}
                          control={<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />}
                          label={
                            <Box sx={{ ml: 1 }}>
                              <Typography variant="subtitle2">{title}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {description}
                              </Typography>
                            </Box>
                          }
                          sx={{ flexGrow: 1, py: 3 }}
                        />
                          {isDesktop && (<Stack direction="row" spacing={1} flexShrink={0}>
                            {icons.map((icon) => (
                              <Image key={icon} alt="logo card" src={icon} />
                            ))}
                          </Stack>)}
                      </OptionStyle>
                    );
                  })}
              </RadioGroup></Grid></Grid>

              {!!error && (
                <FormHelperText error sx={{ pt: 1, px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </>
          )}
        />
        </>
  );
}
