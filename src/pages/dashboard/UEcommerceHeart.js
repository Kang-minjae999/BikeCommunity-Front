import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Grid, Container, Typography, Link, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { deleteHeartUsed } from '../../redux/slices/product';
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
  const { heart } = useSelector((state) => state.usedHeart);
  const linkTo = `${PATH_DASHBOARD.usedeCommerce.root}/product/detail/${heart.id}`
  const onClick = (id) => {
    dispatch(deleteHeartUsed(id))
  }
  return (
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}}>
        {/* <CheckoutCart /> */}
       {/*  {heart && <Typography>{heart.map((item)=> (item))}</Typography>} */}
       <Grid sm={4} lg={4}>
        {heart.map((item)=> 
        <Link  key={item.heartId} component={RouterLink} to={linkTo}>
          <Box>
            <Image alt={item.name} src={item.heartImageURLs} />
            <Label>{item.heartStatus}</Label>
            <Typography variant='subtitle2'>{item.heartTitle}</Typography>
            <Typography variant='body2'>{item.heartBrand}/{item.heartModelName}</Typography>
            <Typography variant='body2'>{item.heartYear}년식/{item.heartMileage}km</Typography>
            <Button size="small" variant="text" onClick={() => onClick(item.heartId)}>
            <DeleteIcon />
            </Button>
          </Box>
        </Link>)}
        </Grid>
      </Container>
  );
}
