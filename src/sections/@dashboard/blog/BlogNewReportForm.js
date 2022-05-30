import * as Yup from 'yup';
import { useCallback } from 'react';
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
import { FormProvider, RHFTextField, RHFUploadMultiFileReport } from '../../../components/hook-form';
//
import axios from '../../../utils/axios';
import useAuth from '../../../hooks/useAuth';
import { access, refresh } from '../../../utils/jwt';

// ----------------------------------------------------------------------

export default function BlogNewReportForm() {
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
    Images: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  
  const onSubmit = async (data) => {
    const formData = new FormData()
    data.Images.map((file) => formData.append('imageFiles', file));
    formData.append('content', data.content)
    formData.append('title', data.title)
    formData.append('nickname', user.nickname)

    try {
      await axios.post(`/admin-post-service/report/${user.nickname}`, formData ,{
        headers: {
        'content-type': 'multipart/form-data',
        headers: {
          accesstoken: access,
          refreshtoken: refresh,
        },
        },
      });
      enqueueSnackbar('공지사항 추가 완료!');
      navigate(PATH_DASHBOARD.blog.reports);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrops = useCallback(
    (acceptedFiles) => {
      setValue(
        'Images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );
  
  const handleRemoveAll = () => {
    setValue('Images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.Images?.filter((_file) => _file !== file);
    setValue('Images', filteredItems);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
           <CardHeader title='신고하기/문의하기/건의하기' sx={{mb:2}}/>
            <Card sx={{ p: 3 ,mb:2}}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="제목" color='action'/>
                <RHFTextField name="content" label="내용" multiline minRows={8} color='action'/>
                <RHFUploadMultiFileReport
                  name="Images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrops}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
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

