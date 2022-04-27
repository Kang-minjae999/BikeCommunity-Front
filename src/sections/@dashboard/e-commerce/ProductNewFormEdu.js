import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Button, CardHeader } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFEditor,
  RHFTextField,
  RHFUploadMultiFile,
  RHFRadioGroup,
} from '../../../components/hook-form';
import ProductNewFormOptionGrid from './ProductNewFormOptionGrid';

// ---------------------------------------------

const CATEGORY_OPTION = [
  '안전/라이딩기술 교육',
  '면허시험교육',
  '정비교육',
];


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewFormEdu.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewFormEdu({ isEdit, currentProduct }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('상품명이 필요합니다.'),
    description: Yup.string().required('설명이 필요합니다.'),
    images: Yup.array().min(1, '사진을 한 개 이상 올려주세요.'),
    price: Yup.number().moreThan(0, '가격은 0원 이상입니다.'),
  });

  const defaultValues = useMemo(
    () => ({
      eduName: currentProduct?.productName || null,
      images: currentProduct?.images || [],
      content: currentProduct?.content || null,
      category: currentProduct?.category || null,
      optionmany: currentProduct?.optionmany || null,


      option1:  currentProduct?.option1 || null, 
      option2:  currentProduct?.option2 || null, 
      option3:  currentProduct?.option3 || null, 
      option4:  currentProduct?.option3 || null, 
      option5:  currentProduct?.option3 || null, 
      howmany:  currentProduct?.howmany || null, 
      modelName:  currentProduct?.modelName || null, 
      sku:  currentProduct?.sku || null, 
      price:  currentProduct?.price || null, 
      priceSale:  currentProduct?.priceSale || null, 
      option: currentProduct?.option || [{
        option1: null, 
        option2: null, 
        option3: null, 
        option4: null, 
        option5: null, 
        howmany: null, 
        modelName: null, 
        sku: null, 
        price: null, 
        priceSale: null, 
      }], // 옵션은 따로 관리?

      
      academyName: currentProduct?.academyName || null,
      teacherName: currentProduct?.teacherName || null,
      academyPhoneNumber: currentProduct?.academyPhoneNumber || null,
      academyLocation: currentProduct?.academyLocation || null,
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

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
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

  const [options, setOptions] = useState([])

  const onOption = () => {
      setOptions([...options, 
        {
            id:values.option1,
            option1:values.option1,
            option2:values.option2,
            option3:values.option3,
            option4:values.option4,
            option5:values.option5,
            howmany:values.howmany,
            modelname:values.modelname,
            price:values.price,
            priceSale:values.priceSale,
            sku:values.sku,
        }])
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant='h6'>아카데미 설명</Typography>
              <RHFTextField name="eduName" label="홈페이지 노출 강의 이름" />
              <div>
                <LabelStyle>대표 사진</LabelStyle>
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </div>
              <div>
                <LabelStyle>교육 설명</LabelStyle>
                <RHFEditor simple name="content" />
              </div>
              <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      noOptionsText="그런 카테고리는 없어요!"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={CATEGORY_OPTION.map((option) => option)}
                      renderInput={(params) => (
                        <RHFTextField name="category" label="카테고리" {...params} placeholder="카테고리" />
                      )}
                    />
                  )}
                />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
              <Typography variant='h6' sx={{mb:2}}>강의 옵션 설정</Typography>
              <Stack spacing={3} mt={2} mb={2} direction='row'>
                <>
                <RHFTextField name="option1" label="옵션1 강의명 ex) Chapter 1. 초급자 과정" />
                <RHFTextField name="option2" label="옵션2 날짜 ex) 2022년 2월 22일"  />
                <RHFTextField name="option3" label="옵션3 시간 ex) 14:00~16:00" />
                <RHFTextField name="option4" label="옵션4 강의위치 ex) 경기도 군포시 산본동 군포체육센터" />
                <RHFTextField name="option5" label="옵션4 준비물 ex) 헬멧" />
                </>
                <RHFTextField
                  name="howmany"
                  label="할당 인원"
                  placeholder="0"
                  value={getValues('howmany') === 0 ? '' : getValues('howmany')}
                  onChange={(event) => setValue('howmany', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">개</InputAdornment>,
                    type: 'number',
                  }}
                />
                <RHFTextField name="sku" label="교육자 강의 코드(SKU)" />
              </Stack>
              <Stack spacing={3} mb={2} direction='row'>
                <RHFTextField
                  name="price"
                  label="정상가"
                  placeholder="0"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">원</InputAdornment>,
                    type: 'number',
                  }}
                />

                <RHFTextField
                  name="priceSale"
                  label="판매가"
                  placeholder="0"
                  value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                  onChange={(event) => setValue('priceSale', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">원</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>
              <Button variant='outlined' sx={{width:'25%', mb:2}} onClick={onOption}>옵션추가</Button>
                <ProductNewFormOptionGrid optionmany={values.optionmany} options={options} setOptions={setOptions}/>
            </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant='h6'>교육자 상세내용</Typography>                
                <RHFTextField name="academyName" label="아카데미 이름" />
                <RHFTextField name="teacherName" label="교육자/대표자 이름" />        
                <RHFTextField name="academyPhoneNumber" label="문의 전화번호" />            
            </Stack>
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
