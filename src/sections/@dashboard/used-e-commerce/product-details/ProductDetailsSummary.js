import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
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
import useAuth from '../../../../hooks/useAuth';

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
  product: PropTypes.object
}



export default function ProductDetailsSummary({ product, onAddHeart, onGotoStep, ...other }) {
  const navigate = useNavigate();
  const {user} = useAuth()
  const { enqueueSnackbar } = useSnackbar();

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
    bikeImageURLs,
    createdDate
  } = product;

  const defaultValues = {
    heartId: id,
    heartTitle: title,
    heartImageURLs: bikeImageURLs[0],
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
      enqueueSnackbar('찜목록에 추가되었어요!')
    } catch (error) {
      console.error(error);
    }
  };

  const goEdit = () => {
    navigate(`product/newmoto/${id}/edit`)
  }

  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label
          variant='filled'
          color={status === 0 ? 'info' : 'error'}
          sx={{mb:1}}
        >
        {status === 0 && '판매중'}
        {status === 1 && '예약중'}
        {status === 2 && '판매완료'}
        </Label> 

        <Typography variant="h5" paragraph>
          {title}
        </Typography>

        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{mb:2}}>
          <Box>
          <Avatar alt={nicknameOfSeller}  src={avatarURLOfSeller} sizes='small'/>
          <Typography variant='subtitle2'>  
          {nicknameOfSeller} 
          </Typography>
          </Box>
          <Typography variant='body2'>  
          {createdDate}
          </Typography>
         </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} >
          <Typography variant="subtitle2" >
          {brand}
          </Typography>
          <Typography variant="subtitle2" >
          {modelName}
          </Typography>
          <Typography variant="subtitle2" >
          {displacement}cc
          </Typography>
        </Stack>  

        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} >
        <Typography variant="subtitle2" >
            {year}년식
        </Typography>
        <Typography variant="subtitle2" >
            {mileage}km
          </Typography>
          <Typography variant="subtitle2" >
          {gearbox ? '메뉴얼': '스쿠터'}
          </Typography>
        </Stack>  

        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} >
          <Label variant='filled' color={negoable ? 'info' : 'error'} sx={{mb:1}} >
          {negoable && '네고가능'}
          {!negoable && '네고불가능'}
          </Label> 
          <Label variant='filled' color={tradeable ? 'info' : 'error'} sx={{mb:1}} >
          {tradeable && '대차가능'}
          {!tradeable && '대차불가능'}
          </Label> 
          <Label variant='filled' color={isCrashed ? 'info' : 'error'} sx={{mb:1}} >
          {isCrashed && '무사고'}
          {!isCrashed && '사고있음'}
          </Label> 
        </Stack> 
        <Typography variant='body2' color='text.secondary' sx={{mb:1}}>대차 가능 모델</Typography> 
        {tradeableModels.map((model)=> (<Chip key={model} label={model} sx={{mb:1}}/>))}

        <Typography variant="h4" sx={{ mb: 2 }}>
          {price}원
        </Typography>

        <Divider  />

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
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
        {nicknameOfSeller === user?.nickname &&
        <Button fullWidth size="large" type="submit" variant="contained" onClick={goEdit}>
            수정하기
        </Button>}
      </FormProvider>
    </RootStyle>
  );
}

