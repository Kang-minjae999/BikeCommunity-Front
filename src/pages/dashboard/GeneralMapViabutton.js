import PropTypes from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import StraightIcon from '@mui/icons-material/Straight';
import { Divider, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';


const emails = ['바이크', '장비', '부품용품'];


function SimpleDialog(props) {

  const {enqueueSnackbar} = useSnackbar()
  
  const { onClose, selectedValue, open, destination, onSubmitViaDesti } = props;

  const navigate = useNavigate()

  const handleClose = () => {
    onClose(selectedValue);
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
            <ListItemText>오늘 이 경로로 갈게요!</ListItemText>
          </ListItem>
          <Divider />
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  destination: PropTypes.array.isRequired,
  onSubmitViaDesti: PropTypes.func.isRequired,
  
};

GeneralMapViabutton.propTypes = {
  destination: PropTypes.array.isRequired,
  onSubmitViaDesti: PropTypes.func.isRequired,
};


export default function GeneralMapViabutton({destination, onSubmitViaDesti}) {
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
      variant="outlined"
      color='inherit'
      startIcon={<StraightIcon  />}
      sx={{m:2}}>
      새 경로로 라이딩하기
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        destination={destination}
        onSubmitViaDesti={onSubmitViaDesti}
      />
    </div>
  );
}