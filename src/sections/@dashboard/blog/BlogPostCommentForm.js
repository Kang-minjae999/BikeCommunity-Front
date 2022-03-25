import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axios from '../../../utils/axiospost';

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------
BlogPostCommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCommentForm({post}) {
  const {id} = post
  const navigate = useNavigate();
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
      await axios.post(`/dingsta/${id}/comment`, {commentReq:data.content} ,
      {
        headers: {
          authorization: accessToken,
        },
      });
      reset()
      enqueueSnackbar('덧글 추가 완료!');
      navigate(`${PATH_DASHBOARD.blog.dingsta}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        덧글 쓰기
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="comment" label="덧글" multiline rows={3} />
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            덧글 달기
          </LoadingButton>
        </Stack>
      </FormProvider>
    </RootStyles>
  );
}
