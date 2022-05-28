import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, FormControlLabel, Checkbox, Button, Box } from '@mui/material';
// routes
import DaumPostcode from 'react-daum-postcode';
import axios from '../../../utils/axios';
// components
import {
  FormProvider,
  RHFTextField,
  RHFEditor,
} from '../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { access, refresh } from '../../../utils/jwt';

// ----------------------------------------------------------------------
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

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [model, setmodel] = useState(false);
  const [brand, setbrand] = useState(false);

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('동호회 이름이 필요해요!'),
    content: Yup.string().required('소개가 필요해요!'),
    age: Yup.string().required('나이가 필요해요!'),
    city: Yup.string().required('지역이 필요해요!'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      isPublic: currentProduct?.isPublic || true,
      age: currentProduct?.age || [],
      city: currentProduct?.city || '',
      bikeModel: currentProduct?.bikeModel || '',
      bikeBrand: currentProduct?.bikeBrand || '',
      idOfCaptain: currentProduct?.idOfCaptain || '',
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
    const formData = new FormData();
    data.tags.map((tag) => formData.append('tags', tag));
    data.Images.map((file) => formData.append('imageFiles', file));
    formData.append('isPublic', data.isPublic);
    formData.append('content', data.content);
    try {
      await axios.post('/dingsta', formData, {
        headers: {
          'content-type': 'multipart/form-data',
            accesstoken: access,
            refreshtoken: refresh,
        },
      });
      enqueueSnackbar('클럽 추가 완료!');
      navigate(PATH_DASHBOARD.blog.dingstas);
    } catch (error) {
      console.error(error);
    }
  };

    
  const handleChange = () => {
    setbrand((prev) => !prev);
  };

  const handleChange2 = () => {
    setmodel((prev) => !prev);
  };


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
      setValue('city', city);
    };
  
    const postCodeStyle = {
      display: 'block',
      position: 'relative',
      top: '0%',
      width: '480px',
      height: '490px',
      padding: '7px',
    };
    // 다음 주소 끝
    const city = watch('city')

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="동호회 이름" autoComplete="false"/>
              <RHFEditor name="description" label="소개" multiline minRows={5}/>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                <div>
                <LabelStyle>지역</LabelStyle>
                <Button onClick={onChangeOpenPost} variant="outlined" sx={{ width: '100%' ,mb:1}}>
                  지역찾기
                </Button>
                {isOpenPost ? <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} /> : ''}
                {city && <RHFTextField name="city" placeholder='지역은 (도/시/군/구)만 남아요!'  autoComplete="false" />}
                </div>
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
                <div>
                  <LabelStyle>아래는 선택사항이니 선택하지 않으셔도 돼요!</LabelStyle>
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
                <br/>
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
               </div>
              </Stack>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? '동호회 등록하기' : '동호회 수정하기'}
            </LoadingButton>
            <Box sx={{mb:5}}/>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
