import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Chip, Stack,  Typography, Autocomplete } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { RHFSwitch, FormProvider, RHFTextField, RHFUploadMultiFile } from '../../../components/hook-form';
//
import axios from '../../../utils/axiospost';

// ----------------------------------------------------------------------


const TAGS_OPTION = [
  '모델명, 브랜드 등 아무거나 자유롭게 입력해주세요!'
];
// ----------------------------------------------------------------------

export default function BlogNewDingstaForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();


  const NewBlogSchema = Yup.object().shape({
    content: Yup.string().required('내용이 필요해요!'),
    images: Yup.mixed().required('사진이 필요해요!'),
    tags: Yup.array().min(1,"태그를 한가지이상 정해주세요!").required('태그를 적어주세요!'),
  });

  const defaultValues = {
    content: '',
    images: [],
    tags: '[]',
    publish: true,
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

  const onSubmit = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.post('/dingsta', {
        headers: {
          Authorization: accessToken,
        },
      });
      enqueueSnackbar('딩스타그램 추가 완료!');
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
              <Stack spacing={2}>
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrops}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
                <RHFTextField name="content" label="내용" multiline minRows={5}/>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
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
                      renderInput={(params) => <RHFTextField name="tags" label="태그" {...params}/>}
                    />
                  )}
                />
                </Grid>
                <Grid item xs={3} md={3}>
                 <RHFSwitch
                    name="publish"
                    label="공개"
                    labelPlacement="start"
                    sx={{ mt: 1, mx: 0, width: 1, justifyContent: 'row' }}
                  />
                </Grid>
                </Grid>
              </Stack>
              <LoadingButton fullWidth type="submit" variant="outlined" size="large" loading={isSubmitting} >
                올리기
              </LoadingButton>
              </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

