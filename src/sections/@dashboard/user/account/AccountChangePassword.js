import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import axios from '../../../../utils/axiosuser';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.put(`/users/${user?.id}/password`, data
       ,{
        headers: {
          Authorization: accessToken,
        },
      });
      enqueueSnackbar('회원 수정 완료!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="oldPassword" type="password" label="현재 비밀번호" />

          <RHFTextField name="newPassword" type="password" label="새 비밀번호" />

          <RHFTextField name="confirmNewPassword" type="password" label="새 비밀번호 확인" />

          <LoadingButton type="submit" variant="outlined" loading={isSubmitting}>
            비밀번호 변경
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
