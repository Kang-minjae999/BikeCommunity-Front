import PropTypes from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Divider, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Dialog} from '@mui/material';
import StraightIcon from '@mui/icons-material/Straight';
import StarIcon from '@mui/icons-material/Star';
import Iconify from '../../../components/Iconify';

function SimpleDialog(props) {
  
  const { onClose, open, destination, onSubmitViaDesti, onSubmitViaLike } = props;

  const navigate = useNavigate()

  const handleClose = () => {
    onClose();
  };

  
  const handleListItemClick1 = () => {
    if(window.ReactNativeWebView){
      window.Kakao.Navi.start({
        name: '라이더타운에서 설정한 경로',
        x: 127.11205203011632,
        y: 37.39279717586919,
        vehicleType:7,
        rpOption:4,
        routeInfo:true,
        viaPoints:[destination]
        // viapoint -> name, x, y
      })
    } else {
      alert('어플리케이션에서만 이용 가능합니다.')
    }
  }; 


  const handleListItemClick2 = () => {
    if(window.ReactNativeWebView){
      const name = '라이더타운에서 설정한 경로'
      navigate(`nmap://navigation?dlat=${37.5209436}&dlng=${127.1230074}&dname=${name}&appname=com.ridertown`);
    } else {
      alert('어플리케이션에서만 이용 가능합니다.')
    }
  }; 

  const handleListItemClick3 = () => {
    onSubmitViaDesti()
  }; 

  const handleListItemClick4 = () => {
    onSubmitViaLike()
    handleClose()
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
            <ListItemText>경로 추적 라이딩</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleListItemClick4()}>
            <ListItemAvatar>
              <Avatar  >
              <StarIcon color='warning' fontSize='large'/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText>경로 저장하기!</ListItemText>
          </ListItem>
          <Divider />
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  destination: PropTypes.array.isRequired,
  onSubmitViaDesti: PropTypes.func.isRequired,
  onSubmitViaLike: PropTypes.func.isRequired,
  
};

GeneralMapViabutton.propTypes = {
  destination: PropTypes.array.isRequired,
  onSubmitViaDesti: PropTypes.func.isRequired,
  onSubmitViaLike: PropTypes.func.isRequired
};


export default function GeneralMapViabutton({destination, onSubmitViaDesti, onSubmitViaLike}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
      onClick={handleClickOpen}
      variant="outlined"
      color='inherit'
      endIcon={<StraightIcon />}
      sx={{m:2}}>
      새 경로
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        destination={destination}
        onSubmitViaDesti={onSubmitViaDesti}
        onSubmitViaLike={onSubmitViaLike}
      />
    </div>
  );
}