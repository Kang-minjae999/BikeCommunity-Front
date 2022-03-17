// @mui
import { Box, Typography, Stack } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// assets
import { UploadIllustration } from '../../assets';


// ----------------------------------------------------------------------

export default function BlockContents() {
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
          사진을 선택해주세요!
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          첫번째 사진은 대표사진이 될거에요!
        </Typography>
    </Stack>
  );
}

