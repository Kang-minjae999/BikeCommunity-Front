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
import { Grid, Chip, Stack,  Typography, Autocomplete, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { RHFSwitch, FormProvider, RHFTextField, RHFUploadMultiFile } from '../../../components/hook-form';
//
import axios from '../../../utils/axiospost';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------


const TAGS_OPTION = [
  '모델명, 브랜드 등 아무거나 자유롭게 입력해주세요!'
];
// ----------------------------------------------------------------------

export default function BlogNewDingstaForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const {user} = useAuth()

  const NewBlogSchema = Yup.object().shape({
    imageFiles: Yup.array().min(1,"태그를 한가지이상 정해주세요!").required('태그를 적어주세요!'),
  });

  /* imageFiles: Yup.mixed().required('사진이 필요해요!'), */
  const defaultValues = {
    dingstaPostRequest:{
    content: '',
    tags: '[]',
    },
    imageFiles: []
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
    console.log(data)
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.post(`/dingsta/${user.nickname}`, data ,{
        headers: {
          authorization: accessToken,
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
      const formData = new FormData();
      acceptedFiles.map((file) =>
      formData.append('imageFiles', file))
      setValue(
        'imageFiles',formData
      );
    },
    [setValue]
  );
  
  const handleRemoveAll = () => {
    setValue('imageFiles', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('imageFiles', filteredItems);
  };


  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
              <Stack spacing={2}>
                <RHFUploadMultiFile
                  name="imageFiles"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrops}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
                <RHFTextField name="dingstaPostRequest.content" label="내용" multiline minRows={5}/>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                <Grid container spacing={1}>
                  <Grid item xs={9} md={9}>
                <Controller
                  name="dingstaPostRequest.tags"
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
                      renderInput={(params) => <RHFTextField name="dingstaPostRequest.tags" label="태그" {...params}/>}
                    />
                  )}
                />
                </Grid>
                <Grid item xs={3} md={3}>
                 {/* <RHFSwitch
                    name="publish"
                    label="공개"
                    labelPlacement="start"
                    sx={{ mt: 1, mx: 0, width: 1, justifyContent: 'row' }}
                  /> */}
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

