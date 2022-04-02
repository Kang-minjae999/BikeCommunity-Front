import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card,  Stack,  CardHeader } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { RHFSwitch,  FormProvider, RHFTextField, RHFUploadMultiFile } from '../../../components/hook-form';
//
import axios from '../../../utils/axiospostadmin';

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const defaultValues = {
    title: '',
    content: '',
    images: [],
    ispublic: true,
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
    data.images.map((file) => formData.append('imageFiles', file));
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('isPublic', data.isPublic)
    try {
      await axios.post('/posts', {
        headers: {
          Authorization: accessToken,
        },
      });
      enqueueSnackbar('공지사항 추가 완료!');
      navigate(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrops = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
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
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };


  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
           <CardHeader title='포스트' sx={{mb:2}}/>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="제목" />
                <RHFTextField name="content" label="내용" />
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrops}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
                <RHFSwitch
                    name="isPublic"
                    label="공개"
                    labelPlacement="start"
                    sx={{ mt: 1, mx: 0, width: 1, justifyContent: 'row' }}
                  /> 
              <LoadingButton fullWidth type="submit" variant="outlined" size="large" loading={isSubmitting}>
                올리기
              </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

