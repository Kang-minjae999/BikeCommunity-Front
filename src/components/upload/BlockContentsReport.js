// @mui
import { Box, Typography, Stack } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// assets
import { UploadIllustration } from '../../assets';


// ----------------------------------------------------------------------

export default function BlockContentsReport() {
  return (
    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="center"
      direction='column'
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
        <AddAPhotoIcon />
       <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          신고 해결에 도움이 되는 사진이 있다면 첨부해주세요!
        </Typography>
    </Stack>
  );
}
