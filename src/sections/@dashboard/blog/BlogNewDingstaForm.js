import * as Yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Chip, Stack, Autocomplete } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFUploadMultiFile, RHFCheckbox } from '../../../components/hook-form';
//
import axios from '../../../utils/axios';
import { access, refresh, IsValid } from '../../../utils/jwt';

// ----------------------------------------------------------------------
const TAGS_OPTION = ['모델명, 브랜드 등 아무거나 자유롭게 입력해주세요!'];
// ----------------------------------------------------------------------

export default function BlogNewDingstaForm() {
  useEffect(() => {
    IsValid()
    // eslint-disable-next-line
  }, [])
  
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewBlogSchema = Yup.object().shape({
    Images: Yup.array().min(1, '사진을 한가지이상 정해주세요!').required('사진을 올려주세요!'),
  });

  const defaultValues = {
    content: '',
    tags: [],
    Images: [],
    isPublic: true,
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    if (!Array.isArray(watch('tags'))) {
      enqueueSnackbar('엔터나 추가 버튼을 눌러 태그를 추가해주세요!');
      return;
    }
    if (watch('tags') === []) {
      enqueueSnackbar('태그를 추가해주세요!');
      return;
    }
    const formData = new FormData();
    data.tags.map((tag) => formData.append('tags', tag));
    data.Images.map((file) => formData.append('imageFiles', file));
    formData.append('isPublic', data.isPublic);
    formData.append('content', data.content);
    try {
      await axios.post('/post-service/dingsta', formData, {
        headers: {
          'content-type': 'multipart/form-data',
            accesstoken: access,
            refreshtoken: refresh,
        },
      });
      enqueueSnackbar('딩스타그램 추가 완료!');
      navigate(PATH_DASHBOARD.blog.dingstas);
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
            <Stack spacing={2}>
              <RHFUploadMultiFile
                name="Images"
                showPreview
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrops}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
              <RHFTextField name="content" label="내용" multiline minRows={5} color='action'/>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <Grid container spacing={1}>
                  <Grid item xs={9} md={9}>
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          multiple
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={TAGS_OPTION.map((option) => option)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                            ))
                          }
                          renderInput={(params) => <RHFTextField name="tags" label="태그" {...params} color='action'/>}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3} md={3}>
                  <RHFCheckbox name="isPublic" label="공개" labelPlacement="start" sx={{mt:1}}/>
                  </Grid>
                </Grid>
              </Stack>
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
