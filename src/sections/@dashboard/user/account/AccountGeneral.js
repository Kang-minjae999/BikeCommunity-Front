import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import axios from '../../../../utils/axiosuser';
import { access, refresh } from '../../../../utils/jwt';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    name: user?.name || '',
    email: user?.email || '',
    nickname: user?.nickname || '',
    avatar: user?.avatar || '',
    phoneNumber: user?.phoneNumber || '',
    address:  
    {
      address: user?.address?.address || '',
      detailAddress: user?.address?.detailAddress || '',
      zipcode: user?.address?.zipcode || ''
    },
    birthday: user?.about || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (data) => {
    try {
      await axios.put(`/users/${user?.id}`, data
       ,{
        headers: {
          accesstoken: access,
          refreshtoken: refresh,
        },
      });
      enqueueSnackbar('회원 수정 완료!');
      window.location.replace("/")
    } catch (error) {
      console.error(error);
    }
  };

  const [avataron, setavataron] = useState(false)

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
      setavataron(true)
        setValue(
          'avatar',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onClickavatar = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const formData = new FormData()
    formData.append('imageFile', watch('avatar'))
    try {
      await axios.put(`/users/${user?.id}/avatar`, formData
       ,{
        headers: {
          Authorization: accessToken,
        },
      });
      enqueueSnackbar('아바타 업로드 완료!');
    } catch (error) {
      console.error(error);
    }
  };
  
  const deleteavatar = async () => {
    try {
      await axios.delete(`/users/${user?.id}/avatar`,{
        headers: {
          accesstoken: access,
          refreshtoken: refresh,
        },
      });
      setValue('avatar', '')
      enqueueSnackbar('아바타 삭제 완료!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="avatar"
              accept="image/*"
              maxSize={31457281}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  아바타를 올려주세요!
                  <br /> 최대크기 : {fData(31457281)}
                </Typography>
              }
            />
          {(defaultValues.avatar || watch('avatar')) && <Button onClick={deleteavatar} variant='outlined' color='inherit' sx={{mt:1, mr:1}}>아바타 삭제</Button>}
          {avataron && <Button onClick={onClickavatar} variant='outlined' sx={{mt:1}}>아바타 업로드</Button>}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="이름" />
              <RHFTextField name="email" label="이메일" />
              <RHFTextField name="phoneNumber" label="번호" />
              <RHFTextField name="nickname" label="닉네임" />
              <RHFTextField name="address.address" label="주소" />
              <RHFTextField name="address.detailAddress" label="상세주소" />
              <RHFTextField name="address.zipcode" label="우편번호" />
              <LoadingButton type="submit" fullWidth variant="outlined" color='inherit' loading={isSubmitting}>
                저장하기
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
