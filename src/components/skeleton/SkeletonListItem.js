// @mui
import { Box, Skeleton, Grid } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonListItem() {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Skeleton variant="rectangular" width="100%" sx={{ height: 250, borderRadius: 2 }} />
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
    </Grid>
  );
}
