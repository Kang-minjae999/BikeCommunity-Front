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
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, FormControlLabel, Checkbox, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

const GENDER_OPTION = ['상관없음', '남자', '여자'];

const OPEN_OPTION = ['공개', '비공개'];


const AGE_OPTION = [
  '10대',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대',
  '70대',
  '80대',
  '90대',
];

const MODEL_OPTION = [
  'cbr125r',
  'cbr250rr',
  'cbr500r',
  'cbr600rr',
];

const BRAND_OPTION = [
  'cbr125r',
  'cbr250rr',
  'cbr500r',
  'cbr600rr',
];



const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [model, setmodel] = useState(false);
  const [brand, setbrand] = useState(false);

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('동호회 이름이 필요합니다.'),
    description: Yup.string().required('설명이 필요합니다.'),
    age: Yup.string().required('나이가 필요합니다.'),
    city: Yup.string().required('지역이 필요합니다.'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      open: currentProduct?.open || OPEN_OPTION[0],
      gender: currentProduct?.gender || GENDER_OPTION[0],
      age: currentProduct?.age || '',
      city: currentProduct?.city || '',
      model: currentProduct?.model || '',
      brand: currentProduct?.brand || '',
      clubking: currentProduct?.clubking || '',
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
      enqueueSnackbar(!isEdit ? '동호회 생성 완료!' : '동호회 수정 완료!');
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

    
  const handleChange = () => {
      setbrand((prev) => !prev);
  };

  const handleChange2 = () => {
    setmodel((prev) => !prev);
  };


  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  const hi = () => {
    console.log(watch('brand'))
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="동호회 이름" autoComplete="false"/>
                <RHFTextField name="content" label="소개" multiline minRows={5}/>
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
            <LabelStyle>검색/공개 여부</LabelStyle>
                  <RHFRadioGroup
                    name="open"
                    options={OPEN_OPTION}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
              <Stack spacing={3} mt={2}>

                <div>
                  <LabelStyle>성별</LabelStyle>
                  <RHFRadioGroup
                    name="gender"
                    options={GENDER_OPTION}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div>
                <RHFTextField name="city" label="지역" autoComplete="false"/>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={AGE_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="나이대" {...params} />}
                    />
                  )}
                />
                <FormControlLabel
                control={<Checkbox checked={brand} onChange={handleChange} />}
                label="입장 가능한 브랜드 선택하기"
                />
                {!brand
                ? '' :  <Controller
                 name="model"
                 control={control}
                 render={({ field }) => (
                   <Autocomplete
                     multiple
                     onChange={(event, newValue) => field.onChange(newValue)}
                     options={BRAND_OPTION.map((option) => option)}
                     renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                         <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                       ))
                     }
                     renderInput={(params) => <TextField 
                      name="brand" label="브랜드" helperText='브랜드를 검색해주세요.'{...params} />}
                   />
                 )}
               />}     

                <FormControlLabel
                control={<Checkbox checked={model} onChange={handleChange2} />}
                label="입장 가능한 기종 선택하기"
                />
                {!model
                ? '' :  <Controller
                 name="model"
                 control={control}
                 render={({ field }) => (
                   <Autocomplete
                     multiple
                     onChange={(event, newValue) => field.onChange(newValue)}
                     options={MODEL_OPTION.map((option) => option)}
                     renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                         <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                       ))
                     }
                     renderInput={(params) => <TextField 
                      name="model" label="모델명" helperText='모델명을 검색해주세요.'{...params} />}
                   />
                 )}
               />}
              </Stack>
            </Card>


            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? '동호회 등록하기' : '동호회 수정하기'}
            </LoadingButton>
           {/*  <Button onClick={hi}>안녕하세요</Button> */}
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
