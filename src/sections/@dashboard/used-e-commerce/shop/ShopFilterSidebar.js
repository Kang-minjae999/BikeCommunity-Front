import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

// @mui
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { RHFRadioGroup, RHFTextField, FormProvider, RHFCheckbox } from '../../../../components/hook-form';
import ShopFilterSidebarSlider from './ShopFilterSidebarSlider';
import ShopFilterSidebarSliderPrice from './ShopFilterSidebarSliderPrice';
import ShopFilterSidebarSliderDisplacement from './ShopFilterSidebarSliderDisplacement';
import axios from '../../../../utils/axiosuser';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export const FILTER_GEARBOX_OPTIONS = ['메뉴얼', '스쿠터'];

export const FILTER_DISPLACEMENT_OPTIONS = ['50~250', '250~500', '500~900', '900~'];

export const FILTER_MILEAGE_OPTIONS = ['0~5000', '5000~10000', '10000~15000', '15000~20000', '20000~25000', '25000~'];

export const FILTER_PRICE_OPTIONS = ['~300', '300~600','600~900','900~1200','1200~1500','1500~'];

export const FILTER_NEGO_OPTIONS = ['가능', '불가능'];

export const FILTER_TRADE_OPTIONS = ['가능', '불가능'];

export const FILTER_CRASH_OPTIONS = ['사고있음', '무사고'];


export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];

export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];

export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];


// ----------------------------------------------------------------------


ShopFilterSidebar.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default function ShopFilterSidebar({ isOpen, onOpen, onClose }) {
 
  const defaultValues = {
    gearbox: null,
    displacement: [0,0],
    maxDisplacement: false,
    isCrash: null,
    address: '',
    modelName: '',
    year: '',
    mileage: [0,0],
    maxMileage: false,
    price: [0,0],
    maxPrice: false,
    nego: null,
    trade: null,
    tradeModel: '',
  };



  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  
  const values = watch();

  const resetAll = () => {
    reset();
  };


  useEffect(() => {
    if(values.maxDisplacement){
      setValue('displacement', [1500, 1500])
    }
    if(values.maxMileage){
      setValue('mileage', [30000, 30000])
    }
    if(values.maxPrice){
      setValue('price', [3000, 3000])
    }
  }, [values.maxDisplacement,values.maxMileage, values.maxPrice, setValue]);

  
   /* useEffect(() => {
    if(values.displacement !== [1500, 1500]){
      setValue('maxDisplacement', false)
    }
    if(values.mileage !== [30000, 30000]){
      setValue('maxMileage', false)
    }
    if(values.price !== [3000, 3000]){
      setValue('maxPrice', false)
    }
   }, [values.displacement,values.mileage, values.price, setValue])  */
  
   console.log(values)

    const onSubmit = async (data) => {
    console.log(data)
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.post('/posts', {
        headers: {
          Authorization: accessToken,
        },
      });
    } catch (error) {
      console.error(error);
    };
  };
  
  return (
    <>            
      <Button disableRipple color="inherit" endIcon={<Iconify icon={'ic:round-filter-list'} />} onClick={onOpen}>
        상세검색
      </Button>

      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: { width: '100%', height:'85vh'},
        }}
      >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> 
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            상세검색
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={2} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ px: 1 }} spacing={2}>
            <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ px: 1 }} spacing={2}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">종류</Typography>
                <RHFRadioGroup name="gearbox" options={FILTER_GEARBOX_OPTIONS} row={false}/>
              </Stack>
              <Stack spacing={1}>
                  <Typography variant="subtitle1">사고</Typography>
                  <RHFRadioGroup name="isCrash" options={FILTER_CRASH_OPTIONS} row={false} />
                </Stack>
                <Stack spacing={1}>
                <Typography variant="subtitle1">대차</Typography>
                  <RHFRadioGroup name="trade" options={FILTER_TRADE_OPTIONS} row />
                </Stack>
            </Stack>  
            <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ px: 1 }} spacing={2}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">지역</Typography>
                <RHFTextField name="address"  size='small'/>
                </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle1">모델명</Typography>
                <RHFTextField name="modelName"  size='small'/>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle1">연식</Typography>
                <RHFTextField name="year" size='small'/>
              </Stack>
              <Stack spacing={1}>
              <Typography variant="subtitle1">대차 가능 모델</Typography>
                  <RHFTextField name='tradeModel' size='small'/>
              </Stack>

              </Stack>
            </Stack>
            
            <Stack direction="column"  sx={{ px: 2, width:'100%' }} spacing={2}>
              <Stack spacing={1} direction='column' sx={{ width:'100%' }} >
                <Typography variant="subtitle1">배기량</Typography>
                <Stack direction='row' justifyContent='space-between'>
                  <Controller
                    name="displacement"
                    control={control}
                    render={({ field }) => (
                  <ShopFilterSidebarSliderDisplacement field={field}/>)}/>
                  <RHFCheckbox name="maxDisplacement" label="1500cc이상" labelPlacement="top" sx={{mr:3}}/>
                </Stack>
                <Typography variant="subtitle1">키로수</Typography>
                <Stack direction='row' justifyContent='space-between' >
                  <Controller
                    name="mileage"
                    control={control}
                    render={({ field }) => (
                  <ShopFilterSidebarSlider field={field}/>)}/>
                  <RHFCheckbox name="maxMileage" label="30000km이상" labelPlacement="top"/>
                </Stack>
                <Typography variant="subtitle1">가격</Typography>
                <Stack direction='row' justifyContent='space-between'>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                  <ShopFilterSidebarSliderPrice field={field}/>)}/> 
                <RHFCheckbox name="maxPrice" label="3000만원이상" labelPlacement="top" />
              </Stack>  
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt:2}}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={resetAll}
                startIcon={<Iconify icon={'ic:round-clear-all'} />}
              >
                초기화
              </Button>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                loading={isSubmitting}
                startIcon={<Iconify icon={'ic:search'} />}>
                검색
              </LoadingButton>
              </Stack>
            </Stack>
          </Stack>    
        </Scrollbar>          
     </FormProvider>  
      </Drawer>
    </>
  );
}
