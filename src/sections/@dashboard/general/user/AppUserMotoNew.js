import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, React, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, Autocomplete, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import axios from '../../../../utils/axiossecondhand';
// option
import BRAND_OPTION from '../../../../components/option/BRAND_OPTION';
import HONDA_OPTION from '../../../../components/option/HONDA_OPTION';
import YAMAHA_OPTION from '../../../../components/option/YAMAHA_OPTION';
import SUZUKI_OPTION from '../../../../components/option/SUZUKI_OPTION';
import KAWASAKI_OPTION from '../../../../components/option/KAWASAKI_OPTION';
import BMW_OPTION from '../../../../components/option/BMW_OPTION';
import DUCATI_OPTION from '../../../../components/option/DUCATI_OPTION';
import HARLEY_OPTION from '../../../../components/option/HARLEY_OPTION';
import INDIAN_OPTION from '../../../../components/option/INDIAN_OPTION';
import TRIUMPH_OPTION from '../../../../components/option/TRIUMPH_OPTION';
import KTM_OPTION from '../../../../components/option/KTM_OPTION';
import HUSQVARNA_OPTION from '../../../../components/option/HUSQVARNA_OPTION';
import VESPA_OPTION from '../../../../components/option/VESPA_OPTION';
import DAELIM_OPTION from '../../../../components/option/DAELIM_OPTION';
import KRMOTORS_OPTION from '../../../../components/option/KRMOTORS_OPTION';
import KYMCO_OPTION from '../../../../components/option/KYMCO_OPTION';
import ROYALENFIELD_OPTION from '../../../../components/option/ROYALENFIELD_OPTION';
import BENELLI_OPTION from '../../../../components/option/BENELLI_OPTION';
import CLASSIC125_OPTION from '../../../../components/option/CLASSIC125_OPTION';
import APRILIA_OPTION from '../../../../components/option/APRILIA_OPTION';
import MVAGUSTA_OPTION from '../../../../components/option/MVAGUSTA_OPTION';
import ROYALALLOY_OPTION from '../../../../components/option/ROYALALLOY_OPTION';
import FBMONDIAL_OPTION from '../../../../components/option/FBMONDIAL_OPTION';
import MOTOGUZZI_OPTION from '../../../../components/option/MOTOGUZZI_OPTION';
// components
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../../components/hook-form';
// ----------------------------------------------------------------------

const GEARBOX_OPTION = ['메뉴얼', '스쿠터'];

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
// ----------------------------------------------------------------------

AppUserMotoNew.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function AppUserMotoNew({ isEdit, currentProduct }) {
  const [MODEL_OPTION, SETMODEL_OPTION] = useState([]);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('상품명이 필요해요.'),
    content: Yup.string().required('상품설명이 필요해요.'),
    images: Yup.array().min(1, '사진을 한 장 이상 올려주세요.'),
    address: Yup.string().required('주소가 필요해요.').nullable(),
    gearbox: Yup.string().required('종류가 필요해요.').nullable(),
    brand: Yup.string().required('설명이 필요해요.').nullable(),
    modelName: Yup.string().required('모델명이 필요해요.').nullable(),
    displacement: Yup.number()
      .moreThan(1, '배기량을 입력해주세요.')
      .lessThan(10000, '배기량을 알맞게 입력해주세요.')
      .nullable(),
    mileage: Yup.number().moreThan(0, '키로수를 입력해주세요.').nullable(),
    year: Yup.string().min(4, '년식을 입력해주세요.').max(4, '년식을 입력해주세요.').nullable(),
    price: Yup.number().moreThan(0, '가격은 0원 이상이에요.'),
    negoable: Yup.boolean(),
    tradeable: Yup.boolean(),
    isCrashed: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentProduct?.title || '',
      content: currentProduct?.content || '',
      images: currentProduct?.bikeImageURLs || [],
      address: currentProduct?.address || '',
      gearbox: currentProduct?.gearbox || null,
      brand: currentProduct?.brand || null,
      modelName: currentProduct?.modelName || null,
      year: currentProduct?.year || 0,
      displacement: currentProduct?.displacement || 0,
      mileage: currentProduct?.mileage || 0,
      price: currentProduct?.price || 0,
      negoable: currentProduct?.negoable || false,
      tradeable: currentProduct?.tradeable || false,
      isCrashed: currentProduct?.isCrashed || false,
      tradeableModel: currentProduct?.tradeableModel || [],
    }),
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
  }, [isEdit, currentProduct, defaultValues, reset]);

  // ---------------------------------------------------------------

  const [gearboxPost, setGearboxPost] = useState();

  useEffect(() => {
    if (values.gearbox === '메뉴얼') {
      setGearboxPost(true);
    }
    if (values.gearbox === '스쿠터') {
      setGearboxPost(false);
    }
  }, [values]);


  // ---------------------------------------------------------------

  useEffect(() => {
    if (values.brand === '혼다') {
      SETMODEL_OPTION(HONDA_OPTION);
    }
    if (values.brand === '야마하') {
      SETMODEL_OPTION(YAMAHA_OPTION);
    }
    if (values.brand === '스즈키') {
      SETMODEL_OPTION(SUZUKI_OPTION);
    }
    if (values.brand === '가와사키') {
      SETMODEL_OPTION(KAWASAKI_OPTION);
    }
    if (values.brand === 'BMW') {
      SETMODEL_OPTION(BMW_OPTION);
    }
    if (values.brand === '두카티') {
      SETMODEL_OPTION(DUCATI_OPTION);
    }
    if (values.brand === '할리데이비슨') {
      SETMODEL_OPTION(HARLEY_OPTION);
    }
    if (values.brand === '인디안') {
      SETMODEL_OPTION(INDIAN_OPTION);
    }
    if (values.brand === '트라이엄프') {
      SETMODEL_OPTION(TRIUMPH_OPTION);
    }
    if (values.brand === 'KTM') {
      SETMODEL_OPTION(KTM_OPTION);
    }
    if (values.brand === '허스크바나') {
      SETMODEL_OPTION(HUSQVARNA_OPTION);
    }
    if (values.brand === '베스파') {
      SETMODEL_OPTION(VESPA_OPTION);
    }
    if (values.brand === '대림') {
      SETMODEL_OPTION(DAELIM_OPTION);
    }
    if (values.brand === '효성') {
      SETMODEL_OPTION(KRMOTORS_OPTION);
    }
    if (values.brand === '킴코') {
      SETMODEL_OPTION(KYMCO_OPTION);
    }
    if (values.brand === '로얄엔필드') {
      SETMODEL_OPTION(ROYALENFIELD_OPTION);
    }
    if (values.brand === '베넬리') {
      SETMODEL_OPTION(BENELLI_OPTION);
    }
    if (values.brand === '이탈젯/부캐너/cg/엘로이') {
      SETMODEL_OPTION(CLASSIC125_OPTION);
    }
    if (values.brand === '아프릴리아') {
      SETMODEL_OPTION(APRILIA_OPTION);
    }
    if (values.brand === 'MV아구스타') {
      SETMODEL_OPTION(MVAGUSTA_OPTION);
    }
    if (values.brand === '로얄알로이') {
      SETMODEL_OPTION(ROYALALLOY_OPTION);
    }
    if (values.brand === 'FB몬디알') {
      SETMODEL_OPTION(FBMONDIAL_OPTION);
    }
    if (values.brand === '모토구찌') {
      SETMODEL_OPTION(MOTOGUZZI_OPTION);
    }
    if (values.brand === '기타') {
      SETMODEL_OPTION([{ value: '기타' }]);
    }
  }, [values.brand]);

  // ---------------------------------------------------------------
  const onSubmit = async (data) => {
    if (isEdit) {
      if (!Array.isArray(watch('tradeableModel'))) {
        enqueueSnackbar('태그 칸에서 엔터를 눌러 태그를 추가해주세요!');
        return;
      }
      const accessToken = window.localStorage.getItem('accessToken');
      const formData = new FormData();
      data.images.map((file) => formData.append('imageFiles', file));
      formData.append('content', data.content);
      formData.append('address', data.address);
      formData.append('gearbox', gearboxPost);
      formData.append('brand', data.brand);
      formData.append('modelName', data.modelName);
      formData.append('year', data.year);
      formData.append('displacement', data.displacement);
      formData.append('mileage', data.mileage);
      formData.append('price', data.price);
      formData.append('negoable', data.negoable);
      formData.append('tradeable', data.tradeable);
      formData.append('isCrashed', data.isCrashed);
      data.tradeableModel.map((model) => formData.append('tradeableModel', model));
      try {
        await axios.post('/biketrade', formData, {
          headers: {
            'content-type': 'multipart/form-data',
            authorization: accessToken,
          },
        });
        reset();
        enqueueSnackbar(!isEdit ? '성공적으로 업로드 되었습니다!' : '성공적으로 업로드 되었습니다!');
        navigate(PATH_DASHBOARD.general.marketu);
      } catch (error) {
        console.error(error);
      }
    } else {
      if (!Array.isArray(watch('tradeableModel'))) {
        enqueueSnackbar('태그 칸에서 엔터를 눌러 태그를 추가해주세요!');
        return;
      }
      const accessToken = window.localStorage.getItem('accessToken');
      const formData = new FormData();
      data.images.map((file) => formData.append('imageFiles', file));
      formData.append('content', data.content);
      formData.append('address', data.address);
      formData.append('gearbox', gearboxPost);
      formData.append('brand', data.brand);
      formData.append('modelName', data.modelName);
      formData.append('year', data.year);
      formData.append('displacement', data.displacement);
      formData.append('mileage', data.mileage);
      formData.append('price', data.price);
      formData.append('negoable', data.negoable);
      formData.append('tradeable', data.tradeable);
      formData.append('isCrashed', data.isCrashed);
      data.tradeableModel.map((model) => formData.append('tradeableModel', model));
      try {
        await axios.put('/biketrade', formData, {
          headers: {
            'content-type': 'multipart/form-data',
            authorization: accessToken,
          },
        });
        reset();
        enqueueSnackbar(!isEdit ? '성공적으로 업로드 되었습니다!' : '성공적으로 업로드 되었습니다!');
        navigate(PATH_DASHBOARD.general.marketu);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const [modelAlert, setModelAlert] = useState('브랜드를 먼저 선택해주세요!');

  useEffect(() => {
    if (values.brand) {
      setModelAlert('그런 모델명은 없어요!');
    }
    if (values.brand === '기타') {
      setModelAlert('기타를 선택해주세요.');
    }
  }, [values.brand]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{mb:5}}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="bikename" label="바이크 별명" autoComplete="false" />
              <RHFTextField name="content" label="바이크 설명" autoComplete="false" multiline minRows={2} />
              <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={1} mb={1}>
                <Controller
                  name="gearbox"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      noOptionsText="메뉴얼, 스쿠터 중에 골라주세요"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={GEARBOX_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => (
                        <RHFTextField name="gearbox" label="종류" {...params} placeholder="종류" />
                      )}
                    />
                  )}
                />

                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      noOptionsText="그런 브랜드는 없어요!"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={BRAND_OPTION.map((option) => option.label)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => (
                        <RHFTextField name="brand" label="브랜드" {...params} placeholder="브랜드" />
                      )}
                    />
                  )}
                />

                <Controller
                  name="modelName"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      noOptionsText={modelAlert}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={MODEL_OPTION.map((option) => option.value)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => (
                        <RHFTextField name="modelName" label="모델명" {...params} placeholder="모델명" />
                      )}
                    />
                  )}
                />
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      noOptionsText="그런 년도는 없어요"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={YEAR_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField name="year" label="연식" {...params} placeholder="연식" />}
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
                    endAdornment: <InputAdornment position="end">cc</InputAdornment>,
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
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                    type: 'number',
                  }}
                />
  
            <LoadingButton type="submit" variant="outlined" color='inherit' size="large" loading={isSubmitting}>
            {!isEdit ? '바이크 등록하기' : '바이크 수정하기'}
            </LoadingButton>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}