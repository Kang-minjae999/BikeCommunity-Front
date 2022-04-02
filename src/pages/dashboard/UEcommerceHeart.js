import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Grid, Container, Typography, Link, Button, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { deleteHeartUsed, deleteAllHeartUsed } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
// sections
import Image from '../../components/Image';
import Label from '../../components/Label';

// ----------------------------------------------------------------------


export default function UEcommerceHeart() {
  const { themeStretch } = useSettings(); 
  const dispatch = useDispatch()
  const { usedHeart } = useSelector((state) => state.product);

  const linkTo = `${PATH_DASHBOARD.usedeCommerce.root}/product/detail/${usedHeart?.id}`

  const onClick = (id) => {
    dispatch(deleteHeartUsed(id))
  }
  const onClick2 = (id) => {
    dispatch(deleteAllHeartUsed(id))
  }

  return (
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}}>
      <Grid container spacing={1}>
       {usedHeart?.map((item)=> 
        <Grid item xs={6} lg={6} key={item.name}>
          <Card>
            <Link component={RouterLink} to={linkTo}>
            <Box>
            <Image alt={item.name} src={item.heartImageURLs} />
            <Label>{item.heartStatus}</Label>
            <Typography variant='subtitle2'>{item.heartTitle}</Typography>
            <Typography variant='body2'>{item.heartBrand}/{item.heartModelName}</Typography>
            <Typography variant='body2'>{item.heartYear}년식/{item.heartMileage}km</Typography>
            </Box>
            </Link>
            <Button size="small" variant="text" onClick={() => onClick(item.heartId)}>
            <DeleteIcon />
            </Button>
          </Card>
        </Grid>)} 
        <Button onClick={onClick2}>초기화</Button>
      </Grid>
      </Container>
  );
}
