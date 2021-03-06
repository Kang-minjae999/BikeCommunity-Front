// @mui
import { Box, Typography, Stack } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      spacing={0}
      alignItems="center"
      justifyContent="center"
      direction='column'
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
        <AddAPhotoIcon />
      <Box sx={{ p: 3 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ëíėŽė§ 
        </Typography>
      </Box>
    </Stack>
  );
}

