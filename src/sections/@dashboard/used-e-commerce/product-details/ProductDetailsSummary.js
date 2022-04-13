import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Divider, Modal, Typography, Avatar, Chip } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { fToNow } from '../../../../utils/formatTime';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { FormProvider } from '../../../../components/hook-form';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../utils/axiossecondhand';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  onAddHeart: PropTypes.func,
  checkHeart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.object
}



export default function ProductDetailsSummary({ product, onAddHeart, checkHeart, onGotoStep, ...other }) {
  const navigate = useNavigate();
  const {user} = useAuth()
  const { enqueueSnackbar } = useSnackbar();

  const {
    id,
    title,
    address,
    gearbox,
    brand,
    modelName,
    price,
    year,
    mileage,
    displacement,
    status,
    negoable,
    tradeable,
    isCrashed,
    nicknameOfSeller,
    avatarURLOfSeller,
    tradeableModels,
    bikeImageURLs,
    createdDate,
    isGarage
  } = product;


  const defaultValues = {
    heartId: id,
    heartTitle: title,
    heartAddress: address,
    heartImageURLs: bikeImageURLs[0],
    heartBrand: brand,
    heartModelName: modelName,
    heartYear: year,
    heartMileage: mileage,
    heartIsGarage: isGarage,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      onGotoStep(0);
      navigate(PATH_DASHBOARD.eCommerce.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(checkHeart(values))
  const handleAddHeart = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    if(checkHeart(values)){
      try {
        await axios.get(`/biketrade/zzim/${id}`, {
          headers: {
            authorization: accessToken,
          }});
        onAddHeart(values);
        enqueueSnackbar('찜목록에 추가되었어요!')
      } catch (error) {
        console.error(error);
      }
    } else {
      enqueueSnackbar('이미 찜목록에 있어요!')
    }
  };

  const goEdit = () => {
    navigate(`/dashboard/used-e-commerce/product/newmoto/${id}/edit`)
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const jaeUp = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
      try {
        await axios.get(`/biketrade/refresh/${id}`, {
          headers: {
            authorization: accessToken,
          }});
        enqueueSnackbar('재업하기가 완료됐어요!')
      } catch (error) {
        console.error(error);
    }
  };


  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
        <Label
          variant='outlined'
          color={status === 0 ? 'info' : 'error'}
          sx={{mb:1, mr:1}}
        >
        {status === 0 && '판매중'}
        {status === 1 && '예약중'}
        {status === 2 && '판매완료'}
        </Label> 
        <Label
          variant='outlined'
          color={isGarage ? 'success' : 'info'}
          sx={{mb:1}}
        >
        {isGarage  && '정비소'}
        {!isGarage  && '개인'}
        </Label> 
        </Box>

        <Typography variant="h5" paragraph>
          {title}
        </Typography>

        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{mb:2}}>
          <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar alt={nicknameOfSeller}  src={avatarURLOfSeller} sizes='small'/>
          <Typography variant='subtitle2'>  
          {nicknameOfSeller} 
          </Typography>
          </Stack>
          <Typography variant='body2'>  
          {fToNow(createdDate)}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} >
          <Stack direction='column' justifyContent='center'>
          <Typography variant="subtitle2" >
          {brand}
          </Typography>
          <Typography variant="subtitle2" >
          {modelName}
          </Typography>
          </Stack>
          <Typography variant="subtitle2" >
          {displacement}cc
          </Typography>
          <Typography variant="subtitle2" >
          {gearbox ? '메뉴얼': '스쿠터'}
          </Typography>
        </Stack>  

        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} >
        <Typography variant="subtitle2" >
          {address}
          </Typography>
        <Typography variant="subtitle2" >
            {year}년식
        </Typography>
        <Typography variant="subtitle2" >
            {mileage}km
          </Typography>
        </Stack>  

        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 2 }} >
        {negoable ?  
          <Typography variant='body2' color='blue' sx={{mb:1}}>
            네고가능
          </Typography> :
          <Typography variant='body2' color='red' sx={{mb:1}}>
            네고불가능
          </Typography> }
          {tradeable ?  
          <Typography variant='body2' color='blue' sx={{mb:1}}>
            대차가능
          </Typography> :
          <Typography variant='body2' color='red' sx={{mb:1}}>
            대차불가능
          </Typography> }
          {!isCrashed ?  
          <Typography variant='body2' color='blue' sx={{mb:1}}>
            무사고
          </Typography> :
          <Typography variant='body2' color='red' sx={{mb:1}}>
            사고있음
          </Typography> }
        </Stack> 
        {tradeable &&
        <><Typography variant='body2' color='text.secondary' sx={{mb:1}}>대차 가능 모델</Typography> 
        {tradeableModels.map((model)=> (<Chip key={model} label={model} sx={{mb:2}}/>))}</>}

        <Typography variant="h4" sx={{ mb: 2 }}>
          {fCurrency(price)}원
        </Typography>

        <Divider  />

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            fullWidth
            size="large"
            color="info"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddHeart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            찜하기
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained" color='inherit' onClick={onSubmit}>
            채팅하기
          </Button>
        </Stack>
        {nicknameOfSeller === user?.nickname && 
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button fullWidth size="large" type="submit" variant="outlined" color='inherit' onClick={goEdit} sx={{mt:2, color:'text.primary'}}>
            수정하기
        </Button>
        <Button fullWidth size="large" type="submit" variant="outlined" color='inherit' onClick={handleOpen} sx={{mt:2, color:'text.primary'}}>
            재업하기
        </Button>
        </Stack>}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            재업하기
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            재업하기를 하시면 최신 글로 올라갑니다. 재업하기는 하루에 1번 가능합니다. 
          </Typography>
          <Stack direction='row' spacing={2}>
          <Button fullWidth size="large" type="submit" variant="outlined" color='inherit' onClick={jaeUp} sx={{mt:2, color:'text.primary'}}>
            재업하기
         </Button>
          <Button fullWidth size="large" type="submit" variant="outlined" color='inherit' onClick={handleClose} sx={{mt:2, color:'text.primary'}}>
            나가기
          </Button>
          </Stack>
        </Box>
      </Modal>
      </FormProvider>
    </RootStyle>
  );
}

