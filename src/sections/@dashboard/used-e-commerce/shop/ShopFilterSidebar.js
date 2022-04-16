import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { Controller, useForm } from 'react-hook-form';

// @mui
import {
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
import { RHFTextField, FormProvider, RHFCheckbox, RHFRadioGroupForSearch } from '../../../../components/hook-form';
import ShopFilterSidebarSlider from './ShopFilterSidebarSlider';
import ShopFilterSidebarSliderPrice from './ShopFilterSidebarSliderPrice';
import ShopFilterSidebarSliderDisplacement from './ShopFilterSidebarSliderDisplacement';
import useResponsive from '../../../../hooks/useResponsive';
import ShopFilterSidebarSliderYear from './ShopFilterSidebarSliderYear';

// ----------------------------------------------------------------------
export const FILTER_GEARBOX_OPTIONS = [{ value: true, label: '메뉴얼' }, { value: false, label: '스쿠터' }];

export const FILTER_NEGO_OPTIONS = [{ value: true, label: '가능' }, { value: false, label: '불가능' }];

export const FILTER_TRADE_OPTIONS = [{ value: true, label: '가능' }, { value: false, label: '불가능' }];

export const FILTER_CRASH_OPTIONS = [{ value: true, label: '사고있음' }, { value: false, label: '무사고' }];
// ----------------------------------------------------------------------


ShopFilterSidebar.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  setApi: PropTypes.func,
  setProducts: PropTypes.func,
};

export default function ShopFilterSidebar({ isOpen, onOpen, onClose, setApi, products, setProducts }) {
  const isDesktop = useResponsive('up', 'lg')
 
  const defaultValues = useMemo(() => ({
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
  }),[]);

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
    setValueD([0,0])
    setValueP([0,0])
    setValueM([0,0])
    setValueY([0,0])
    setApi('')
    setSub('')
  };

  const [sub, setSub] = useState('')

  const [valueD, setValueD] = useState([0, 0]);
  const [valueP, setValueP] = useState([0, 0]);
  const [valueM, setValueM] = useState([0, 0]);
  const [valueY, setValueY] = useState([0, 0]);

  useEffect(() => {
    if(values.maxDisplacement){
      setValue('displacement', [1500, 1500])
      setValueD([1500, 1500])
    }
    if(values.maxMileage){
      setValue('mileage', [30000, 30000])
      setValueM([30000, 30000])
    }
    if(values.maxPrice){
      setValue('price', [3000, 3000])
      setValueP([3000, 3000])
    }
  }, [values.maxDisplacement,values.maxMileage, values.maxPrice, setValue]);

  useEffect(() => {
    if(+parseInt(values.displacement.map((d) => +d), 10) < 1499){
      setValue('maxDisplacement', false)
    }
    if(+parseInt(values.mileage.map((d) => +d), 10) < 29999){
      setValue('maxMileage', false)
    }
    if(+parseInt(values.price.map((d) => +d), 10) < 2999){
      setValue('maxPrice', false)
    }
  }, [values.displacement,values.mileage, values.price, setValue]);
  

  const submit =  useCallback(() => {
    setSub(() => '')
    if(values.gearbox !== defaultValues.gearbox){
      setSub(sub => `${sub}&gearbox=${values.gearbox}`)
    }
    if(values.displacement !== defaultValues.displacement){
      if(+parseInt(values.displacement.map((d) => +d), 10) !== 0){
        if(+parseInt(values.displacement.map((d) => +d), 10) === 1500){
          setSub(sub=> `${sub}&displacement=1500,10000`)
        } else {
          setSub(sub=> `${sub}&displacement=${values.displacement}`)
        }
      }
    }
    if(values.isCrash !== defaultValues.isCrash){
      setSub(sub=> `${sub}&isCrash=${values.isCrash}`)    
    }
    if(values.address !== defaultValues.address){
      setSub(sub=> `${sub}&address=${values.address}`)    
    }
    if(values.modelName !== defaultValues.modelName){
      setSub(sub=> `${sub}&modelName=${values.modelName}`)    
    }
    if(values.year !== defaultValues.year){
      if(+parseInt(values.year.map((d) => +d), 10) !== 0){
        setSub(sub=> `${sub}&year=${values.year}`)  
      }  
    }
    if(values.mileage !== defaultValues.mileage){
      if(+parseInt(values.mileage.map((d) => +d), 10) !== 0){
        if(+parseInt(values.mileage.map((d) => +d), 10) === 30000){
          setSub(sub=> `${sub}&mileage=30000,1000000`)
        } else {
          setSub(sub=> `${sub}&mileage=${values.mileage}`)
        }
      }
    }
    if(values.price !== defaultValues.price){
      if(+parseInt(values.price.map((d) => +d), 10) !== 0){
        if(+parseInt(values.price.map((d) => +d), 10) === 3000){
          setSub(sub=> `${sub}&price=3000,30000`)
        } else {
          setSub(sub=> `${sub}&price=${values.mileage}`)
        }
      }
    }
    if(values.nego !== defaultValues.nego){
      setSub(sub=> `${sub}&negoable=${values.nego}`)
    }
    if(values.trade !== defaultValues.trade){
      setSub(sub=> `${sub}&tradeable=${values.trade}`)
    }
    if(values.tradeModel !== defaultValues.tradeModel){
      setSub(sub=> `${sub}&tradeModel=${values.tradeModel}`)
    } 
    return sub;
  },[values,defaultValues, sub])

  useEffect(() => {
    submit();
  }, [submit])

  const onSubmit = () => {
    setProducts([])
    submit();
    console.log(sub)
    setApi(sub) 
    onClose()
  }

  return (
    <>            
      <Button disableRipple color="inherit" endIcon={<Iconify icon={'ic:round-filter-list'} />} onClick={onOpen}>
        상세검색
      </Button>

      <Drawer
        anchor={!isDesktop ? 'bottom' : 'left'}
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: { ...(isDesktop ?{ width: '40%',height:'100vh'} : {width: '100%',height:'95vh'})},
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
                <RHFRadioGroupForSearch name="gearbox" options={FILTER_GEARBOX_OPTIONS} row={false}/>
              </Stack>
              <Stack spacing={1}>
                  <Typography variant="subtitle1">사고</Typography>
                  <RHFRadioGroupForSearch name="isCrash" options={FILTER_CRASH_OPTIONS} row={false} />
                </Stack>
                <Stack spacing={1}>
                <Typography variant="subtitle1">대차</Typography>
                  <RHFRadioGroupForSearch name="trade" options={FILTER_TRADE_OPTIONS} row />
                </Stack>
            </Stack>  
            <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ px: 1 }} spacing={2}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">지역</Typography>
                <RHFTextField name="address"  size='small' autoComplete='off' />
                </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle1">모델명</Typography>
                <RHFTextField name="modelName"  size='small' autoComplete='off'/>
              </Stack>
              <Stack spacing={1}>
              <Typography variant="subtitle1">대차 가능 모델</Typography>
                  <RHFTextField name='tradeModel' size='small' autoComplete='off'/>
              </Stack>
              <Stack spacing={1} sx={{mt:1}}>
                <Typography variant="subtitle1" >네고</Typography>
                  <RHFRadioGroupForSearch name="nego" options={FILTER_TRADE_OPTIONS} row />
                </Stack>
              </Stack>
            </Stack>       
            <Stack direction="column"  sx={{ px: 2, width:'100%' }} spacing={2}>
              <Stack spacing={1} direction='column' sx={{ width:'100%' }} >
              <Typography variant="subtitle1">연식</Typography>
                <Stack direction='row' justifyContent='space-between'>
                  <Controller
                    name="year"
                    control={control}
                    render={({ field }) => (
                  <ShopFilterSidebarSliderYear field={field} value={valueY} setValue={setValueY}/>)}/>
                </Stack>
              <Typography variant="subtitle1">배기량</Typography>
                <Stack direction='row' justifyContent='space-between'>
                  <Controller
                    name="displacement"
                    control={control}
                    render={({ field }) => (
                  <ShopFilterSidebarSliderDisplacement field={field} value={valueD} setValue={setValueD}/>)}/>
                  <RHFCheckbox name="maxDisplacement" label="1500cc이상" labelPlacement="top" sx={{mr:3}}/>
                </Stack>
                <Typography variant="subtitle1">키로수</Typography>
                <Stack direction='row' justifyContent='space-between' >
                  <Controller
                    name="mileage"
                    control={control}
                    render={({ field }) => (
                  <ShopFilterSidebarSlider field={field} value={valueM} setValue={setValueM}/>)}/>
                  <RHFCheckbox name="maxMileage" label="30000km이상" labelPlacement="top"/>
                </Stack>
                <Typography variant="subtitle1">가격</Typography>
                <Stack direction='row' justifyContent='space-between'>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                  <ShopFilterSidebarSliderPrice field={field} value={valueP} setValue={setValueP}/>)}/> 
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
