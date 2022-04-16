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
import { Card, Chip, Grid, Stack, Typography, Autocomplete, InputAdornment, Button } from '@mui/material';
// routes
import DaumPostcode from 'react-daum-postcode';
import axios from '../../../utils/axiossecondhand';
// components
import {
  FormProvider,
  RHFTextField,
  RHFUploadMultiFile,
  RHFSwitch
} from '../../../components/hook-form';

// 바이크 중고거래 기준
// ----------------------------------------------------------------------
const CATEGORY_OPTION = 
[ 
  '장비', 
  '부품', 
  '용품',
  ];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

UProductNewFormgear.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};


export default function UProductNewFormgear({ isEdit, currentProduct }) {

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('상품명이 필요합니다.'),
    content: Yup.string().required('설명이 필요합니다.'),
    brand: Yup.string(),
    images: Yup.array().min(1, '사진을 한 개 이상 올려주세요.'),
    price: Yup.number().moreThan(0, '가격은 0원 이상입니다.'),
    etcCategory: Yup.string().min(1, '카테고리를 선택해주세요.').nullable(),
    address: Yup.string().min(1, '카테고리를 선택해주세요.').nullable(),
    negoable: Yup.bool(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentProduct?.title || '',
      content: currentProduct?.content || '',
      brand: currentProduct?.brand || '',
      images: currentProduct?.images || [],
      price: currentProduct?.price || 0,
      etcCategory: currentProduct?.etcCategory || null,    
      address: currentProduct?.address || '',
      negoable: currentProduct?.negoable || false, 
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

  const [submitCate, setSubmitCate] = useState()

  useEffect(() => {
    if (values.etcCategory === '부품') {
      setSubmitCate(0);
    }
    if (values.etcCategory === '용품') {
      setSubmitCate(1);
    }
    if (values.etcCategory === '장비') {
      setSubmitCate(2);
    }
  }, [values.etcCategory]);

  const onSubmit = async (data) => {
    if (!isEdit) {
      const accessToken = window.localStorage.getItem('accessToken');
      const formData = new FormData();
      data.images.map((file) => formData.append('imageFiles', file));
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('address', data.address);
      formData.append('brand', data.brand);
      formData.append('price', data.price);
      formData.append('etcCategory', submitCate);
      formData.append('negoable', data.negoable);
      try {
        await axios.post('/etctrade', formData, {
          headers: {
            'content-type': 'multipart/form-data',
            authorization: accessToken,
          },
        });
        reset();
        enqueueSnackbar(!isEdit ? '성공적으로 업로드 되었습니다!' : '성공적으로 업로드 되었습니다!');
        navigate('/dashboard/marketu/etctrade/0');
      } catch (error) {
        console.error(error);
      }
    } else {
      const accessToken = window.localStorage.getItem('accessToken');
      const formData = new FormData();
      data.images.map((file) => formData.append('imageFiles', file));
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('address', data.address);
      formData.append('brand', data.brand);
      formData.append('price', data.price);
      formData.append('etcCategory', submitCate);
      formData.append('negoable', data.negoable);
      try {
        await axios.put('/etctrade', formData, {
          headers: {
            'content-type': 'multipart/form-data',
            authorization: accessToken,
          },
        });
        reset();
        enqueueSnackbar(!isEdit ? '성공적으로 업로드 되었습니다!' : '성공적으로 업로드 되었습니다!');
        navigate('/dashboard/shop/used/etctrade/0');
      } catch (error) {
        console.error(error);
      }
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

  const [isOpenPost, setIsOpenPost] = useState(false);
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    const sido1 = data.sido;
    const sigungu1 = data.sigungu;
    const city = `${sido1} ${sigungu1}`;

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
  const address = watch('address');

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>        
              <RHFTextField name="title" label="상품명" autoComplete="false"/>
              <RHFTextField name="content" label="상품설명" autoComplete="false" multiline minRows={5} />
              <div>
                <LabelStyle>상품 사진</LabelStyle>
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
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>

              <Stack spacing={3} mt={2}>
              <Button
                  onClick={onChangeOpenPost}
                  variant="outlined"
                  color="inherit"
                  sx={{ width: '100%', mb: 1, color: 'text.primary' }}
                >
                  지역찾기
                </Button>
                {isOpenPost ? <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} /> : ''}
                <RHFTextField
                  name="address"
                  placeholder="지역은 (도/시/군/구)만 남아요!"
                  label={address ? '지역' : '지역찾기를 눌러주세요'}
                  autoComplete="false"
                  disabled
                />
              <Controller
                  name="etcCategory"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={CATEGORY_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="category"
                        label="카테고리" {...params}
                        placeholder='카테고리' />}
                    />
                  )}
                />              

              <RHFTextField name="brand" label="브랜드" autoComplete="false" /> 

              </Stack>
            </Card>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
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

              <RHFSwitch name='negoable' label='네고' labelPlacement='start'/> 


            </Card>

            <LoadingButton type="submit" variant="outlined" color='inherit' size="large" loading={isSubmitting}>
              {!isEdit ? '상품 올리기' : '상품 수정하기'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

