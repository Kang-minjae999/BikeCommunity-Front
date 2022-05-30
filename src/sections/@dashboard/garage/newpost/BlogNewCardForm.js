import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, CardHeader, Autocomplete, Chip ,Typography } from '@mui/material';
// routes;
// components
import { FormProvider, RHFEditor, RHFTextField } from '../../../../components/hook-form';
//
import axios from '../../../../utils/axios';
import useAuth from '../../../../hooks/useAuth';
import { CardSliderOpenTime, GarageCardCalendar } from '.';
import { access, refresh } from '../../../../utils/jwt';

// ----------------------------------------------------------------------
const CATEGORY_OPTION = [
  '정비소',
  '커스텀',
  '카페',
  '세차장',
];

const HOLIDAY_OPTION = [
  {
    label:'휴일없음',
    value:7
  },
  {
    label:'일요일',
    value:0
  },
  {
    label:'월요일',
    value:1
  },
  {
    label:'화요일',
    value:2
  },
  {
    label:'수요일',
    value:3
  },
  {
    label:'목요일',
    value:4
  },
  {
    label:'금요일',
    value:5
  },
  {
    label:'토요일',
    value:6
  },
];

export default function BlogNewCardForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const NewBlogSchema = Yup.object().shape({
    category: Yup.string().required('제목이 필요합니다.'),
  });

  const defaultValues = {
    address:'',
    category:null,
    content:'',
    instagram: undefined,
    holiday:[],
    holydate:[0,0],
    openTime:[0,0],
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch()
  
  const onSubmit = async (data) => {
    try {
      await axios.post(`/garagepost-service/garagecard/${user.nickname}`, 
      {
        address:data.address,
        category:data.category,
        content:data.content,
        holiday:data.holiday,
        instagram:data.instagram,
        holydate:data.holydate,
        openTime:data.openTime,
      } , 
      {
        headers: {
          accesstoken: access,
          refreshtoken: refresh,
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
                <Typography variant='subtitle2'>카테고리</Typography>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                    multiple
                    onChange={(event, newValue) => field.onChange(newValue)}
                    options={CATEGORY_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <RHFTextField name="category" label="카테고리" {...params} color='action'/>}
                  />
                  )}
                />

                <Typography variant='subtitle2'>주소</Typography>
                <RHFTextField name="address" label="주소" color='action'/>

                <Typography variant='subtitle2'>소개</Typography>
                <RHFEditor name="content" label="소개" color='action'/>

                <Typography variant='subtitle2'>인스타그램</Typography>
                <RHFTextField name="instagram" label="인스타그램 주소" color='action' helperText='@를 제외하고 입력해주세요! EX)rt_ridertown'/>

                <Typography variant='subtitle2'>쉬는요일(예약 불가능 요일)</Typography>
                <Controller
                  name="holiday"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                    multiple
                    onChange={(event, newValue) => field.onChange(newValue.map((item) => item.value))}
                    options={HOLIDAY_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option.label} size="small" label={option.label} />
                      ))
                    }
                    renderInput={(params) => <RHFTextField name="holiday" label="요일" {...params} color='action'/>}
                  />
                  )}
                />

                <Typography variant='subtitle2'>휴일선택(예약 불가능 날짜)</Typography>
                <Controller
                  name="holidate"
                  control={control}
                  render={({ field }) => (
                <GarageCardCalendar holiday={values.holiday} field={field}/>)} />

                <Typography variant='subtitle2'>오픈시간(예약 가능 시간대) {values.openTime[0]}시 ~ {values.openTime[1]}시</Typography>
                <Controller
                name="openTime"
                control={control}
                render={({ field }) => (
                  <CardSliderOpenTime field={field} />)} />

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

