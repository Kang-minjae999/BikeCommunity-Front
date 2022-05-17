import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Box, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import axios from '../../../../utils/axiospost';

// ----------------------------------------------------------------------
BlogPostCommentForm.propTypes = {
  id: PropTypes.number.isRequired,
  setComment: PropTypes.func
};

export default function BlogPostCommentForm({id, setComment}) {
  const { enqueueSnackbar } = useSnackbar();

  const CommentSchema = Yup.object().shape({
    content: Yup.string().required('덧글을 입력해주세요!'),
  });

  const defaultValues = {
    content: '',
  };

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.post(`/dingsta/${id}/comment`, {content:data.content},
      {
        headers: {
          authorization: accessToken,
        },
      });
      reset()
      enqueueSnackbar('덧글 추가 완료!');
      setComment(comments => [...comments, data.content]);
      console.log(data.content)
      
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="content" label="댓글" multiline color='action'
          InputProps={{
            endAdornment: (         
            <InputAdornment position="end">
            <LoadingButton type="submit" variant="text" loading={isSubmitting} sx={{color:'text.primary'}}> 
              달기
            </LoadingButton>
            </InputAdornment>)}}/>
        </Stack>
      </FormProvider>
    </Box>
  );
}
