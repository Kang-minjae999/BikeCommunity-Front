import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Link, Stack, Button, Rating, Divider, IconButton, Typography, Avatar, Chip } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import SocialsButton from '../../../../components/SocialsButton';
import { ColorSinglePicker } from '../../../../components/color-utils';
import { FormProvider, RHFSelect } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  onAddHeart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.object({
    id: PropTypes.number,
    title: PropTypes.string,
    gearbox: PropTypes.bool,
    brand: PropTypes.string,
    modelName: PropTypes.string,
    price: PropTypes.number,
    year: PropTypes.number,
    mileage: PropTypes.number,
    displacement: PropTypes.number,
    status: PropTypes.string,
    negoable: PropTypes.bool,
    tradeable: PropTypes.bool,
    isCrashed: PropTypes.bool,
    nicknameOfSeller: PropTypes.string,
    avatarURLOfSeller: PropTypes.string,
    tradeableModels: PropTypes.arrayOf(PropTypes.string),
    imageURLs: PropTypes.arrayOf(PropTypes.string),
})}



export default function ProductDetailsSummary({ product, onAddHeart, onGotoStep, ...other }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    gearbox,
    brand,
    modelName,
    price,
    year,
    mileage,
    displacement,
    status,
    negoable,
    tradeable,
    isCrashed,
    nicknameOfSeller,
    avatarURLOfSeller,
    tradeableModels,
    imageURLs
  } = product;


  const defaultValues = {
    heartId: id,
    heartTitle: title,
    heartImageURLs: imageURLs[0],
    heartBrand: brand,
    heartModelName: modelName,
    heartYear: year,
    heartMileage: mileage,
    heartStatus: status,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      onGotoStep(0);
      navigate(PATH_DASHBOARD.eCommerce.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddHeart = async () => {
    try {
      onAddHeart(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
       {/* <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={inventoryType === 'in_stock' ? 'success' : 'error'}
          sx={{ textTransform: 'uppercase' }}
        >
          {sentenceCase(inventoryType || '')}
        </Label> */}

        <Typography
          variant="overline"
          sx={{
            mt: 2,
            mb: 1,
            display: 'block',
            color: status === '판매중' ? 'error.main' : 'info.main',
          }}
        >
          {status}
        </Typography>

        <Typography variant="h5" paragraph>
          {title}
        </Typography>
        <Typography variant='h6'>  <Avatar alt={nicknameOfSeller}  src={avatarURLOfSeller}/>
         {nicknameOfSeller}
         </Typography>
        <Divider sx={{ borderStyle: 'dashed' }} /><br/>
        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} color='text.secondary'>
        <Typography variant="body2" sx={{ mt: 0.5 }} >
          {gearbox}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }} >
          {brand}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 0.5}} color='text.secondary'>
          {modelName}
          </Typography>
        </Stack>  

        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} color='text.secondary'>
        <Typography variant="subtitle2" sx={{ mt: 0.5 }} >
            {year}년식
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 0.5 }} >
            {mileage}km
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 0.5 }} color='text.secondary'>
          {displacement}cc
          </Typography>
        </Stack>  

        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} color='text.secondary'>
        <Typography variant="subtitle2" sx={{ mt: 0.5 }} >
            {negoable}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 0.5 }} >
            {tradeable}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 0.5 }} color='text.secondary'>
          {isCrashed}
          </Typography>
        </Stack>  
        <Typography variant="subtitle2" sx={{ mt: 0.5 }} color='text.secondary'>
        {tradeableModels.map((model)=> (<Chip key={model}>{model}</Chip>))}
          </Typography>


        <Typography variant="h4" sx={{ mb: 3 }}>

          &nbsp;{fCurrency(price)}원
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Color
          </Typography>

           <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorSinglePicker
                colors={colors}
                value={field.value}
                onChange={field.onChange}
                sx={{
                  ...(colors.length > 4 && {
                    maxWidth: 144,
                    justifyContent: 'flex-end',
                  }),
                }}
              />
            )}
          /> 
        </Stack> */}

          {/*  <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Size
          </Typography>

          <RHFSelect
            name="size"
            size="small"
            fullWidth={false}
            FormHelperTextProps={{
              sx: { textAlign: 'right', margin: 0, mt: 1 },
            }}
            helperText={
              <Link underline="always" color="text.secondary">
                Size Chart
              </Link>
            }
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </RHFSelect> 
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Quantity
          </Typography>

           <div>
            <Incrementer
              name="quantity"
              quantity={values.quantity}
              available={available}
              onIncrementQuantity={() => setValue('quantity', values.quantity + 1)}
              onDecrementQuantity={() => setValue('quantity', values.quantity - 1)}
            />
            <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
              Available: {available}
            </Typography>
          </div> 
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddHeart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            찜하기
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            채팅하기
          </Button>
        </Stack>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <SocialsButton initialColor />
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

/* Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
 */