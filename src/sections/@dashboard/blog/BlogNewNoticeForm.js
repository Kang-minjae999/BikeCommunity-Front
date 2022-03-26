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
import { FormProvider, RHFTextField, RHFUploadMultiFile } from '../../../components/hook-form';
//
import axios from '../../../utils/axiospostadmin';
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
    const accessToken = window.localStorage.getItem('accessToken');
    const formData = new FormData()
    data.Images.map((file) => formData.append('imageFiles', file));
    formData.append('title', data.title)
    formData.append('content', data.content)

    try {
      await axios.post('/notice', formData ,{
        headers: {
        'content-type': 'multipart/form-data',
          Authorization: accessToken,
        },
      });
      enqueueSnackbar('공지사항 추가 완료!');
      navigate(PATH_DASHBOARD.blog.notice);
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
           <CardHeader title='공지사항 글쓰기' sx={{mb:2}}/>
            <Card sx={{ p: 3 ,mb:2}}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="제목" />
                <RHFTextField name="content" label="내용" multiline minRows={8}/>
                <RHFUploadMultiFile
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
              <LoadingButton fullWidth type="submit" variant="outlined" size="large" loading={isSubmitting}>
                올리기
              </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

