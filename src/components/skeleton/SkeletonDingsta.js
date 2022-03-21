// @mui
import { Box, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonDingsta() {
  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Skeleton variant="text" height={64} />
        </Box>
      </Box>
      <Skeleton width="100%" height={600} variant="rectangular" sx={{ borderRadius: 2 }} />
    </>
  );
}
