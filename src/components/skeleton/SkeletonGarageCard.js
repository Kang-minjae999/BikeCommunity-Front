// @mui
import { Box, Skeleton, Grid, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonGarageCard() {
  return (
    <Grid item xs={6} sm={6} md={3}>
      <Skeleton variant="rectangular" width='100%' sx={{ height: 120, borderRadius: 2 }} />
    </Grid>
  );
}
