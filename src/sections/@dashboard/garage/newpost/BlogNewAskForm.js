import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, CardHeader } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { FormProvider, RHFEditor, RHFTextField } from '../../../../components/hook-form';
//
import axios from '../../../../utils/axiosgarage';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function BlogNewAskForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('제목이 필요합니다.'),
    content: Yup.string().required('내용이 필요합니다.'),
  });

  const defaultValues = {
    title: '',
    content: '',
    modelName:'',
    address:'',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  
  const onSubmit = async (data) => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.post(`/garageask/${user.nickname}`, 
      {
        title: data.title,
        content: data.content,
        modelName: data.modelName,
        address: data.address
      } ,{
        headers: {
        Authorization: accessToken,
        },
      });
      enqueueSnackbar('정비 글 추가 완료!');
      navigate(PATH_DASHBOARD.blog.reports);
    } catch (error) {
      console.error(error);
    }
  };


  

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
           <CardHeader title='정비소에 질문하기' sx={{mb:2}}/>
            <Card sx={{ p: 3 ,mb:2}}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="제목" color='action'/>
                <RHFTextField name="modelName" label="모델명" color='action'/>
                <RHFTextField name="address" label="주소" color='action'/>
                <RHFEditor name='content' />
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

