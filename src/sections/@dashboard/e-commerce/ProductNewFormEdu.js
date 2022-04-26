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

// ----------------------------------------------------------------------

const HOWMANY_OPTION = ['1개', '2개', '3개'];

const CATEGORY_OPTION = [
  '신차',
  '장비/의류/블루투스',
  '부품/파츠/튜닝파츠',
  '기타'
];

const NEWMOTO_CATEGORY_OPTION = [
  '재고신차',
  '예약주문',
  '구매대행',
];

const GEAR_CATEGORY_OPTION = [
  '헬멧',
  '자켓',
  '바지',
  '장갑',
  '부츠',
  '슈트',
  '보호대',
  '마스크',
  '가방',
  '블루투스',
  '액션캠',
  '우의',
  '방한용품',
  '악세사리',
];

const PARTS_CATEGORY_OPTION = [
  '머플러',
  '머플러',
  '엔진오일',
  '브레이크오일',
  '냉각수',
  '배터리',
];

const GOODS_CATEGORY_OPTION = [
  '용품',
  '튜닝용품',
  '구매대행',
];


const DETAIL_CATEGORY_OPTION = [
  '신차',
  '부품',
  '튜닝',
  '케미컬',
  '용품',
  '헬멧',
  '자켓',
  '바지',
  '장갑',
  '부츠',
  '슈트',
  '보호대',
  '마스크',
  '가방',
  '블루투스',
  '블랙박스',
  '거치대',
  '리어백',
  '우의',
  '악세사리',
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
      name: currentProduct?.name || '',
      content: currentProduct?.description || '',
      images: currentProduct?.images || [],
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || '',
      optionmany: currentProduct?.tags || null,
      option1: currentProduct?.tags || '',
      option2: currentProduct?.tags || '',
      option3: currentProduct?.tags || '',
      howmany: currentProduct?.tags || '',
      modelname: currentProduct?.tags || '',
      inStock: true,
      taxes: true,
      gender: currentProduct?.gender || HOWMANY_OPTION[2],
      category: currentProduct?.category || null,
      detailCategory: currentProduct?.detailCategory || null,
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
    if(values.optionmany === '1개'){
      setOptions([...options, 
        {
            id:values.option1,
            option1:values.option1,
            howmany:values.howmany,
            modelname:values.modelname,
            price:values.price,
            priceSale:values.priceSale,
            sku:values.sku,
        }])
    }
    if(values.optionmany === '2개'){
      setOptions([...options, 
        {
            id:`${values.option1}${values.option2}`,
            option1:values.option1,
            option2:values.option2,
            howmany:values.howmany,
            modelname:values.modelname,
            price:values.price,
            priceSale:values.priceSale,
            sku:values.sku,
        }])
    }
    if(values.optionmany === '3개'){
      setOptions([...options, 
        {
            id:`${values.option1}${values.option2}${values.option3}`,
            option1:values.option1,
            option2:values.option2,
            option3:values.option3,
            howmany:values.howmany,
            modelname:values.modelname,
            price:values.price,
            priceSale:values.priceSale,
            sku:values.sku,
        }])
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant='h6'>상품 설명</Typography>
              <RHFTextField name="name" label="상품명" />
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
                <LabelStyle>상품 설명</LabelStyle>
                <RHFEditor simple name="content" />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
              <Typography variant='h6' sx={{mb:2}}>상품 옵션 설정</Typography>
                <LabelStyle>옵션 개수</LabelStyle>
                <RHFRadioGroup
                    name="optionmany"
                    options={HOWMANY_OPTION}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
              <Stack spacing={3} mt={2} mb={2} direction='row'>
                {values.optionmany === '1개' && <RHFTextField name="option1" label="옵션1 색상 ex) 블랙" />}
                {values.optionmany === '2개' && <><RHFTextField name="option1" label="옵션1 색상 ex) 블랙" />
                                                  <RHFTextField name="option2" label="옵션2 사이즈 ex) L" /></>}
                {values.optionmany === '3개' && 
                <>
                <RHFTextField name="option1" label="옵션1 색상 ex) 블랙" />
                <RHFTextField name="option2" label="옵션2 사이즈 ex) L" />
                <RHFTextField name="option3" label="옵션3 기타" />
                </>}
                <RHFTextField
                  name="howmany"
                  label="재고수량"
                  placeholder="0"
                  value={getValues('howmany') === 0 ? '' : getValues('howmany')}
                  onChange={(event) => setValue('howmany', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">개</InputAdornment>,
                    type: 'number',
                  }}
                />
                <RHFTextField name="modelname" label="모델명" />
                <RHFTextField name="sku" label="판매자상품코드(SKU)" />
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
              <RHFSwitch name="taxes" label="부가세 포함"  sx={{width:'25%', mb:2}}/>
              <Button variant='outlined' sx={{width:'25%', mb:2}} onClick={onOption}>옵션추가</Button>
                <ProductNewFormOptionGrid optionmany={values.optionmany} options={options} setOptions={setOptions}/>
            </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant='h6'>상품 상세내용</Typography>                
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
                        <RHFTextField name="category" label="카테고리//원동기인지 2종소형인지 그냥 교육인지 등등" {...params} placeholder="카테고리" />
                      )}
                    />
                  )}
                />
                <Controller
                  name="detailCategory"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      noOptionsText="그런 카테고리는 없어요!"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={DETAIL_CATEGORY_OPTION.map((option) => option)}
                      renderInput={(params) => (
                        <RHFTextField name="detailCategory" label="상세카테고리//원동기인지 ㄷㄷㄷㄷ" {...params} placeholder="상세카테고리" />
                      )}
                    />
                  )}
                />
                <RHFTextField name="brand" label="아카데미 이름" />
                <RHFTextField name="returnproduct" label="강의명" />  
                <RHFTextField name="startproduct" label="총 교육 강의 수" /> 
                <RHFTextField name="returnproduct" label="판매 강의 명" placeholder='강의명 챕터 ex 2. 슬라럼' />      
                <RHFTextField name="makecompany" label="일정" placeholder='수입품의 경우 수입자를 함께 표시 병행수입의 경우 병행수입 여부로 대체 가능'/>
                <RHFTextField name="makecountry" label="할당할 교육 명 수" />
                <RHFTextField name="startproduct" label="총 교육 강의 수" />
                <RHFTextField name="returnproduct" label="강의명" />                
                <RHFTextField
                  name="shipping"
                  label="배송비"
                  placeholder="0"
                  value={getValues('shipping') === 0 ? '' : getValues('shipping')}
                  onChange={(event) => setValue('shipping', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">원</InputAdornment>,
                    type: 'number',
                  }}
                />
                <RHFTextField name="usingmodelname" label="제품 사용 가능 모델명" />
                <RHFTextField name="kcnumber" label="kc안전인증 인증번호" placeholder='인증 대상에 해당하지 않는다면 빈칸으로 남겨주세요'/>
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
