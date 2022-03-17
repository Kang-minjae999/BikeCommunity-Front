import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormProvider, RHFTextField } from '../../components/hook-form';

import { varFade, MotionInView } from '../../components/animate';
import axios from '../../utils/axiospost';
// ----------------------------------------------------------------------

export default function FaqsForm() {

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const NewqnaSchema = Yup.object().shape({
    question: Yup.string().required('질문이 필요합니다.'),
  });

  const defaultValues = {
    question:''
  };

  const methods = useForm({
    resolver: yupResolver(NewqnaSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const accessToken = window.localStorage.getItem('accessToken');
  const onSubmit = async () => {
    const question = watch('question')
    try {
      await axios.post('qnas', question ,{
        headers:{
          Authorization: accessToken
        }
      });
      reset();
      enqueueSnackbar('질문이 등록되었어요!');

    } catch (error) {
      console.error(error);
    }
  };



  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3}>
      <MotionInView variants={varFade().inUp}>
        <Typography variant="h4">무엇을 도와드릴까요?</Typography>
      </MotionInView>
      <MotionInView variants={varFade().inUp}>
      <RHFTextField name="question" label="질문" autoComplete='none' multiline rows={4}/>  
      </MotionInView>
      <MotionInView variants={varFade().inUp}>
      <LoadingButton fullWidth size="large" type="submit" variant="outlined" loading={isSubmitting} >
        제출하기
      </LoadingButton>
      </MotionInView>
    </Stack>
    </FormProvider>
  );
}

