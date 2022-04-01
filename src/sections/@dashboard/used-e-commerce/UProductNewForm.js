import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, React, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, Typography, Autocomplete, InputAdornment, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';
// routes
import DaumPostcode from 'react-daum-postcode';
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axiossecondhand';
// components
import {
  FormProvider,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFUploadMultiFile,
  RHFSwitch
} from '../../../components/hook-form';

// 바이크 중고거래 기준
// ----------------------------------------------------------------------

const GEARBOX_OPTION = 
[
  true, false,
];

const BRAND_OPTION = [
'혼다', '야마하', '스즈키', '가와사키',
'할리데이비슨', '인디안','허스크바나','베넬리', 'z', 'zz', 'zzz',
'대림','KR모터스', '기타',
];


const MODEL_OPTION = [
  'cbr125r',
  'cbr250rr',
  'cbr500r',
  'cbr600rr',
];

const YEAR_OPTION = [
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
  '1997',
  '1996',
  '1995',
  '1994',
  '1993',
  '1992',
  '1991',
  '1990',
];

const TRADEMODEL_OPTION = [
  'cbr125r',
  'cbr250rr',
  'cbr500r',
  'cbr600rr',
];


// ----------------------------------------------------------------------

UProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};


export default function UProductNewForm({ isEdit, currentProduct }) {
  const [tradechecked, settradeChecked] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('상품명이 필요합니다.'),
/*     content: Yup.string().required('상품설명이 필요합니다.'),
    images: Yup.array().min(1, '사진을 한 장 이상 올려주세요.'),
    address: Yup.string().required('주소가 필요합니다.'),
    gearbox: Yup.string().required('종류를 선택해주세요.'),
    brand: Yup.string().required('설명이 필요합니다.'),
    modelName: Yup.string().required('모델명이 필요합니다.'),
    displacement: Yup.number().moreThan(1, '배기량을 입력해주세요.').lessThan(10000,'배기량을 알맞게 입력해주세요.').nullable(),
    mileage: Yup.number().moreThan(0, '키로수를 입력해주세요.'),
    year: Yup.string().min(4, '년식을 입력해주세요.').max(4, '년식을 입력해주세요.').nullable(),
    price: Yup.number().moreThan(0, '가격은 0원 이상입니다.'),
    negoable: Yup.boolean(),
    tradeable: Yup.boolean(),
    isCrashed: Yup.boolean(), */
  });

  const defaultValues = useMemo(
    () => ({
      title: currentProduct?.name || 'asfasdf',
      content: currentProduct?.content || 'asdfasf',
      images: currentProduct?.images || [],
      address: currentProduct?.address || 'fasdfasf',
      gearbox: currentProduct?.gearbox || false,
      brand: currentProduct?.brand || 'asdfsfa',
      modelName: currentProduct?.modelName || 'asdf',  
      year: currentProduct?.year || 2000,     
      displacement: currentProduct?.displacement || 100000,
      mileage: currentProduct?.mileage || 10000,   
      price: currentProduct?.price || 1000000,
      negoable: currentProduct?.negoable || false, 
      tradeable: currentProduct?.tradeable || false,
      isCrashed: currentProduct?.isCrashed || false,
      tradeableModel: currentProduct?.trademodel || ['abs'],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
    
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);


  const onSubmit = async (data) => {
    setValue('title', `[${watch('modelName')}] ${watch('title')}`)
    console.log(watch('title'))
    const accessToken = window.localStorage.getItem('accessToken');
    const formData = new FormData()
/*     const formData2 = new FormData()
    formData.append('shBikeRequest.title', values) */
  /*   data.images.map((file) => formData.append('imagesFiles', file)) */
     
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('address', data.address)
    formData.append('gearbox', data.gearbox)
    formData.append('brand', data.brand)
    formData.append('modelName', data.modelName)
    formData.append('year', data.year)
    formData.append('displacement', data.displacement)
    formData.append('mileage', data.mileage)
    formData.append('price', data.price)
    formData.append('negoable', data.negoable)
    formData.append('tradeable', data.tradeable)
    formData.append('isCrashed', data.isCrashed)
    data.tradeableModel.map((model) => formData.append('tradeableModel', model))
    data.images.map((file) => formData.append('imagesFiles', file))  


/*     formData.append('shBikeRequest', {title:data.title})
    formData.append('shBikeRequest', {content:data.content})
    formData.append('shBikeRequest', {address:data.address})
    formData.append('shBikeRequest', {gearbox:data.gearbox})
    formData.append('shBikeRequest', {brand:data.brand})
    formData.append('shBikeRequest', {modelName:data.modelName})
    formData.append('shBikeRequest', {year:data.year})
    formData.append('shBikeRequest', {displacement:data.displacement})
    formData.append('shBikeRequest', {mileage:data.mileage})
    formData.append('shBikeRequest', {price:data.price})
    formData.append('shBikeRequest', {negoable:data.negoable})
    formData.append('shBikeRequest', {tradeable:data.tradeable})
    formData.append('shBikeRequest', {isCrashed:data.isCrashed})
    data.tradeableModel.map((model) => formData.append('shBikeRequest', {tradeableModel:model}))
    data.images.map((file) => formData.append('imageFiles', file))  
  */

    try {
      await axios.post('/biketrade', formData , {
        headers: {
        'content-type': 'multipart/form-data',
        Authorization: accessToken,
        },
      });
      reset();
      enqueueSnackbar(!isEdit ? '성공적으로 업로드 되었습니다!' : '성공적으로 업로드 되었습니다!');
      navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };
  
  const trade = watch('tradeable')

  useEffect(() => {
    if(trade){
      settradeChecked(true)
    } else {
      settradeChecked(false)
    }
  }, [trade])

  // 다음 주소
      const [isOpenPost, setIsOpenPost] = useState(false); // 주소열기
      const onChangeOpenPost = () => {
        setIsOpenPost(!isOpenPost);
      };
    
      const onCompletePost = (data) => {
        const sido1 = data.sido;
        const sigungu1 = data.sigungu;
        const city = `${sido1} ${sigungu1}`
    
        setIsOpenPost(false);
        setValue('address', city);
      };
    
      const postCodeStyle = {
        display: 'block',
        position: 'relative',
        top: '0%',
        width: '480px',
        height: '490px',
        padding: '7px',
      };
      const address = watch('address')
  // 다음 주소 끝
  

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>        
              <RHFTextField name="title" label="상품명" autoComplete="false"/>
              <RHFTextField  name="content" label="상품설명" autoComplete="false" multiline minRows={5}/>
              <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={1} mb={1}>   
              <Button onClick={onChangeOpenPost} variant="outlined" sx={{ width: '100%' ,mb:1}}>
                  지역찾기
                </Button> 
              {isOpenPost ? <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} /> : ''}
               {address && <RHFTextField name="address" placeholder='지역은 (도/시/군/구)만 남아요!'  autoComplete="false" />}
               
              <RHFSwitch name='gearbox' label='기어박스' labelPlacement='start'/> 
                {/*  <Controller
                  name="gearbox"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={GEARBOX_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="gearbox"
                        label="종류" {...params}
                        placeholder='종류' />}
                    />
                  )}
                />  */} 

                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                    {...field}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={BRAND_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="brand"
                        label="브랜드" {...params}
                        placeholder='브랜드' />}
                    />
                  )}
                />        

                <Controller
                  name="modelName"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={MODEL_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="modelName"
                        label="모델명" {...params}
                        placeholder='모델명' />}
                    />
                  )}
                />
                  <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={YEAR_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="year"
                        label="연식" {...params}
                        placeholder='연식' />}
                    />
                  )}
                />
                <RHFTextField
                  name="displacement"
                  label="배기량"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('displacement') === 0 ? '' : getValues('displacement')}
                  onChange={(event) => setValue('displacement', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>cc</InputAdornment>,
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="mileage"
                  label="키로수"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('mileage') === 0 ? '' : getValues('mileage')}
                  onChange={(event) => setValue('mileage', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>km</InputAdornment>,
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="price"
                  label="가격"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>원</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>

              <RHFSwitch name='isCrashed' label='사고유무' labelPlacement='start'/> 
              <RHFSwitch name='negoable' label='네고' labelPlacement='start'/> 
              <RHFSwitch name='tradeable' label='대차' labelPlacement='start'/> 

                {!tradechecked
                ? '' :  <Controller
                 name="tradeModel"
                 control={control}
                 render={({ field }) => (
                   <Autocomplete
                     multiple
                     onChange={(event, newValue) => field.onChange(newValue)}
                     options={TRADEMODEL_OPTION.map((option) => option)}
                     renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                         <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                       ))
                     }
                     renderInput={(params) => <TextField 
                      name="tradeableModel" label="모델명" helperText='모델명을 검색해주세요.'{...params} />}
                   />
                 )}
               />}

            </Card>

            <LoadingButton type="submit" variant="outlined" size="large" loading={isSubmitting}>
              {!isEdit ? '상품 올리기' : '상품 수정하기'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

