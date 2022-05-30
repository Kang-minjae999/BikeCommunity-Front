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
import axios from '../../../../utils/axios';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    Password: Yup.string().required('패스워드가 필요해요.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('Password'), null], '비밀번호가 맞지 않아요.'),
  });

  const defaultValues = {
    Password: '',
    NewPassword: '',
    NewconfirmPassword: '',
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
      await axios.put(`/user-service/users/${user?.id}`, 
      {
        password: data.Password,
        newPassword: data.NewPassword
      }
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
          <RHFTextField name="Password" type="password" label="현재 비밀번호" />

          <RHFTextField name="NewPassword" type="password" label="새 비밀번호" />

          <RHFTextField name="NewconfirmPassword" type="password" label="새 비밀번호 확인" />

          <LoadingButton type="submit" variant="outlined" color='inherit' size='large' loading={isSubmitting}>
            비밀번호변경
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
