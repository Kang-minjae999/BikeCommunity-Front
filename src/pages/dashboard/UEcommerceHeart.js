import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Grid, Container, Typography, Link, Button, Card, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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

  const onClick2 = () => {
    dispatch(deleteAllHeartUsed())
  }



  return (
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}}>
      <Grid container spacing={1}>
      <Grid item xs={12} lg={12} >
      <Stack direction='row' justifyContent='space-between'>
      <Box>
      <Link component={RouterLink} to='/dashboard/marketu/all'>
      <Button ><AddIcon />더 둘러보기</Button> 
      </Link>
      </Box>
      <Box>
      <Button onClick={onClick2}>찜목록 초기화<DeleteIcon /></Button>
      </Box>
      </Stack> 
      </Grid>
       {usedHeart?.map((item)=> 
        <Grid item xs={6} lg={6} key={item.name} sx={{mt:1}}>
          <Card>
            <Link component={RouterLink} to={linkTo}>
            <Box>
            <Image alt={item.name} src={item.heartImageURLs} sx={{mb:1}}/>
            <Label sx={{mb:1}}>{item.heartStatus} / {item.heartAddress}</Label>
            <Typography variant='subtitle2' sx={{mb:1}} noWrap >{item.heartTitle}</Typography>
            <Typography variant='body2' sx={{mb:1}}>{item.heartBrand} / {item.heartModelName}</Typography>
            <Typography variant='body2' sx={{mb:1}}>{item.heartYear}년식 / {item.heartMileage}km</Typography>
            </Box>
            </Link>
            <Button size="small" fullWidth variant="text" onClick={() => onClick(item.heartId)}>
            <DeleteIcon />
            </Button>
          </Card>
        </Grid>)} 
      </Grid>
      </Container>
  );
}
