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
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
//
import axios from '../../../utils/axiospost';

// ----------------------------------------------------------------------

export default function BlogNewNoticeForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('제목이 필요합니다.'),
    content: Yup.string().required('내용이 필요합니다.'),
  });

  const defaultValues = {
    title: '',
    content: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.post('/notices', {
        headers: {
          Authorization: accessToken,
        },
      });
      enqueueSnackbar('공지사항 추가 완료!');
      navigate(PATH_DASHBOARD.blog.notice);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
           <CardHeader title='공지사항 글쓰기'/>
            <Card sx={{ p: 3 ,mb:2}}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="제목" />
                <RHFTextField name="content" label="내용" multiline minRows={8}/>
              </Stack>
            </Card>
              <LoadingButton fullWidth type="submit" variant="outlined" size="large" loading={isSubmitting}>
                올리기
              </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

