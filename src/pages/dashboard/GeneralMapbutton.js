import PropTypes from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import StraightIcon from '@mui/icons-material/Straight';
import { Divider, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';


const emails = ['바이크', '장비', '부품용품'];


function SimpleDialog(props) {

  const {enqueueSnackbar} = useSnackbar()
  
  const { onClose, selectedValue, open, tab, onSubmitDesti } = props;

  const navigate = useNavigate()

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick1 = () => {
    if(window.ReactNativeWebView){
      window.Kakao.Navi.share({
        name: '현대백화점 판교점',
        x: 127.11205203011632,
        y: 37.39279717586919,
        coordType: 'wgs84',
      })
    } else {
      alert('어플리케이션에서만 이용 가능합니다.')
    }
  }; 


  const handleListItemClick2 = () => {
    if(window.ReactNativeWebView){
      navigate('nmap://navigation?dlat=37.5209436&dlng=127.1230074&dname=%EC%98%AC%EB%A6%BC%ED%94%BD%EA%B3%B5%EC%9B%90&appname=com.ridertown');
    } else {
      alert('어플리케이션에서만 이용 가능합니다.')
    }
  }; 

  const handleListItemClick3 = () => {
    if(tab === 'map'){
      enqueueSnackbar('놀고싶다!')     
    }
    if(tab !== 'map'){
      enqueueSnackbar('경유지를 추가하시려면 지도 탭으로 이동해주세요!');
      handleClose();
    }
  }; 

  const handleListItemClick4 = () => {
      onSubmitDesti()     
  }; 



  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ mt:2 }}>
          <ListItem button onClick={() => handleListItemClick1()} >
            <ListItemAvatar>
              <Avatar >
              <Iconify icon='simple-icons:kakaotalk' sx={{ width: 20, height: 20, color:'	#FEE500' }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>카카오내비</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleListItemClick2()}>
            <ListItemAvatar>
              <Avatar  >
              <Iconify icon='simple-icons:naver' sx={{ width: 20, height: 20, color:'green' }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>네이버지도</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleListItemClick3()}>
            <ListItemAvatar>
              <Avatar  >
              <Typography variant='h6' color='text.primary'>RT</Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText>경로추적 라이딩</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleListItemClick4()}>
            <ListItemAvatar>
              <Avatar  >
              <StarIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>오늘 여기 갈래요!</ListItemText>
          </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  onSubmitDesti: PropTypes.func.isRequired,
};

GeneralMapbutton.propTypes = {
  name: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  onSubmitDesti: PropTypes.func.isRequired,
};


export default function GeneralMapbutton({name, tab, onSubmitDesti}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
      onClick={handleClickOpen}
      variant="text"
      color='inherit'
      endIcon={<StraightIcon color='secondary' fontSize='large'/>}
      sx={{m:2}}/>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        tab={tab}
        onSubmitDesti={onSubmitDesti}
      />
    </div>
  );
}