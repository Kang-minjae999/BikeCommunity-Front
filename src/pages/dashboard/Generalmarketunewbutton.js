import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ConstructionIcon from '@mui/icons-material/Construction';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import AddIcon from '@mui/icons-material/Add';
import { Divider } from '@mui/material';


const emails = ['바이크', '장비', '부품용품'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const navigate = useNavigate()

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick1 = () => {
    navigate('/dashboard/used-e-commerce/product/newmoto')
  };

  const handleListItemClick2 = () => {
    navigate('/dashboard/used-e-commerce/product/newgear');
  }; 

  const handleListItemClick3 = () => {
    navigate('/dashboard/used-e-commerce/product/newparts');
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>내 바이크 팔기</DialogTitle>
      <List sx={{ mt:2 }}>
      <Divider />
          <ListItem button onClick={() => handleListItemClick1()} >
            <ListItemAvatar>
              <Avatar sx={{ color: 'black' }}>
                <TwoWheelerIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText >바이크</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleListItemClick2()}>
            <ListItemAvatar>
              <Avatar sx={{ color: 'black' }}>
                <SportsMotorsportsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText >장비</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleListItemClick3()}>
            <ListItemAvatar>
              <Avatar sx={{ color: 'black' }}>
                <ConstructionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText >부품용품</ListItemText>
          </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
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
      startIcon={<AddIcon  />}
      sx={{width:'100%'}}>
      내 바이크 팔기
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}