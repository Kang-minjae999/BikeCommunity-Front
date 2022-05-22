import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, CardHeader, Autocomplete } from '@mui/material';
// routes;
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
//
import axios from '../../../../utils/axiosgarage';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------
const CATEGORY_OPTION = [
  '정비소',
  '커스텀',
  '카페',
  '세차장',
];

export default function BlogNewReserForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const NewBlogSchema = Yup.object().shape({
    category: Yup.string().required('제목이 필요합니다.'),
  });

  const defaultValues = {
    category:null,
    address:''
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  
  const onSubmit = async (data) => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.post(`/garagecard/${user.nickname}`, 
      {
        address:data.address,
        category:data.category
      } , 
      {
        headers: {
        Authorization: accessToken,
        },
      });
      enqueueSnackbar('정비소 카드 추가 완료!');
      navigate('/dashboard/app');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
           <CardHeader title='정비소 카드' sx={{mb:2}}/>
            <Card sx={{ p: 3 ,mb:2}}>
              <Stack spacing={3}>
              <Controller
                  name="category1"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      noOptionsText="그런 카테고리는 없어요!"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={CATEGORY_OPTION.map((option) => option)}
                      renderInput={(params) => (
                        <RHFTextField name="category1" label="정비소" {...params} placeholder="카테고리" />
                      )}
                    />
                  )}
                />
                <Controller
                  name="category2"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      noOptionsText="그런 카테고리는 없어요!"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={CATEGORY_OPTION.map((option) => option)}
                      renderInput={(params) => (
                        <RHFTextField name="category2" label="날짜" {...params} placeholder="카테고리" />
                      )}
                    />
                  )}
                />
                <Controller
                  name="category2"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      noOptionsText="그런 카테고리는 없어요!"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={CATEGORY_OPTION.map((option) => option)}
                      renderInput={(params) => (
                        <RHFTextField name="category2" label="시간" {...params} placeholder="카테고리" />
                      )}
                    />
                  )}
                />
                <RHFTextField name="address1" label="모델명" color='action'/>
                <RHFTextField name="address2" label="내용" color='action'/>
              </Stack>
            </Card>
              <LoadingButton fullWidth type="submit" variant="outlined" size="large" color='inherit' loading={isSubmitting} sx={{color:'text.primary'}}>
                올리기
              </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

