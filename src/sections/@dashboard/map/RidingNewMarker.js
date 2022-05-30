import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
//
import axios from '../../../utils/axios';
import { access, refresh } from '../../../utils/jwt';
// ----------------------------------------------------------------------

export default function RidingNewMarker() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    lat: '',
    lng: '',
    name: '',
    content: '',
    address: '',
    tel: '',
    time: '',
    profile: '',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await axios.post(`/riding-service/marker`, 
      data, 
      {
        headers:{
          accesstoken: access,
          refreshtoken: refresh,
        }
      })
      enqueueSnackbar('추가 완료!');
      navigate(PATH_DASHBOARD.general.riding);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{my:2}}>
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <RHFTextField name="lat" label="위도"  color='action'/>
              <RHFTextField name="lng" label="경도" color='action'/>
              <RHFTextField name="name" label="이름" color='action'/>
              <RHFTextField name="content" label="카테고리 : 카페/도로/명소/정비소" color='action'/>
              <RHFTextField name="address" label="주소" color='action'/>
              <RHFTextField name="tel" label="전화번호" color='action'/>
              <RHFTextField name="time" label="시간대" color='action'/>
              <RHFTextField name="profile" label='프로필 닉네임' color='action'/>
              <LoadingButton fullWidth type="submit" variant="outlined" color='inherit' size="large" loading={isSubmitting}>
                올리기
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
