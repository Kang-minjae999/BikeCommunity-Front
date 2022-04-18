import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Grid, Container, Typography, Link, Button, Card, Stack, Divider } from '@mui/material';
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
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------


export default function UEcommerceHeart() {
  const { themeStretch } = useSettings(); 
  const isDesktop = useResponsive('up', 'lg')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { usedHeart } = useSelector((state) => state.product);

  const gotoDetail = (id) => {
    navigate(`${PATH_DASHBOARD.usedeCommerce.root}/product${id}`)
  }

  const gotoDetailEtc = (id) => {
    navigate(`${PATH_DASHBOARD.usedeCommerce.root}/product${id}`)
  }

  const onClick = (id) => {
    dispatch(deleteHeartUsed(id))
  }

  const onClick2 = () => {
    dispatch(deleteAllHeartUsed())
  }



  return (
      <Container maxWidth={themeStretch ? false : 'xl'} disableGutters sx={{mt:2}}>
      <Grid container spacing={1}>
      <Grid item xs={12} lg={12} >
      <Stack direction='row' justifyContent='space-between'>
      <Box>
      {isDesktop ? 
      <Link component={RouterLink} to='/dashboard/marketu/biketrade/0'>
      <Button ><AddIcon />더 둘러보기</Button> 
      </Link> :
      <Link component={RouterLink} to='/dashboard/shop/marketu/biketrade/0'>
      <Button ><AddIcon />더 둘러보기</Button> 
      </Link>}
      </Box>
      <Box>
      <Button onClick={onClick2}>찜목록 초기화<DeleteIcon /></Button>
      </Box>
      </Stack> 
      </Grid>
       {usedHeart?.map((item) => 
          <Grid item xs={6} lg={3} key={item.heartTitle} sx={{mt:1}}>
          {item.heartType === 'moto' ? 
          <Card>
            <Link underline='none' onClick={()=>gotoDetail(item.heartId)}> 
            <Box >
            <Image alt={item.heartTitle} src={item.heartImageURLs} sx={{mb:1}} ratio='1/1'/>
            <Typography variant='subtitle1' sx={{mb:3, ml:1}} noWrap lineHeight={2} >{item.heartTitle}</Typography>
            <Stack direction='row' justifyContent='space-between' sx={{mx:1}}>
             <Stack direction='column' >    
            {item.heartIsGarage 
            ?  <Typography variant='body2' sx={{mb:1}}>정비소</Typography> 
            : <Typography variant='body2' sx={{mb:1}}>개인</Typography>}
            <Typography variant='body2' sx={{mb:1}}>{item.heartAddress}</Typography>
            </Stack>
             <Stack direction='column' >   
            <Typography variant='body2' sx={{mb:1}}>{item.heartBrand} / {item.heartModelName}</Typography>
            <Typography variant='body2' sx={{mb:1}}>{item.heartYear}년식 / {item.heartMileage}km</Typography>
            <Typography variant='subtitle2' sx={{mb:1}}>{item.heartPrice}원</Typography>
            </Stack>
            </Stack>           
             </Box>
            </Link>
            <Divider  sx={{my:2}}/>
            <Button size="small" fullWidth variant="text" onClick={() => onClick(item.heartId)} sx={{mb:1}}>
            <DeleteIcon />
            </Button>
          </Card> 
          :           
          <Card>
          <Link underline='none' onClick={()=>gotoDetailEtc(item.heartId)}> 
          <Box >
          <Image alt={item.heartTitle} src={item.heartImageURLs} sx={{mb:1}} ratio='1/1'/>
          <Typography variant='subtitle1' sx={{mb:3, ml:1}} noWrap lineHeight={2} >{item.heartTitle}</Typography>
          <Stack direction='row' justifyContent='space-between' sx={{mx:1}}>
           <Stack direction='column' >    
          {item.heartIsGarage 
          ?  <Typography variant='body2' sx={{mb:1}}>정비소</Typography> 
          : <Typography variant='body2' sx={{mb:1}}>개인</Typography>}
          <Typography variant='body2' sx={{mb:1}}>{item.heartAddress}</Typography>
          </Stack>
           <Stack direction='column' >   
          <Typography variant='body2' sx={{mb:1}}>{item.heartBrand}</Typography>
          <Typography variant='subtitle2' sx={{mb:1}}>{item.heartPrice}원</Typography>
          </Stack>
          </Stack>           
           </Box>
          </Link>
          <Divider  sx={{my:2}}/>
          <Button size="small" fullWidth variant="text" onClick={() => onClick(item.heartId)} sx={{mb:1}}>
          <DeleteIcon />
          </Button>
        </Card>}
        </Grid>)}
      </Grid>
      </Container>
  );
}
