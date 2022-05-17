import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Box, List, Badge, Button, Avatar, Divider, Typography, ListItemText, ListSubheader, ListItemAvatar, ListItemButton} from '@mui/material';
// utils
import { useDispatch, useSelector } from '../../../redux/store';
import { readAlert, deleteAllAlert, getAlert } from '../../../redux/slices/notification';
// import { fToNow } from '../../../utils/formatTime';
// _mock_
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { alert, alertNumber, readAlert } = useSelector((state) => state.notification);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAlert())
  }, [dispatch])
  

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={alertNumber} color="error">
        <Iconify icon='bx:bell' sx={{width:28, height:28, color:'text.primary'}} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">알림</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              읽지 않은 메세지가 {alertNumber}개 있어요 &nbsp;
              {alertNumber !== 0 && <Button onClick={() => dispatch(deleteAllAlert())} sx={{color:'text.primary'}}>다지우기</Button>}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
         {alertNumber && 
         <List
            disablePadding
            subheader={
              <>
               <Divider sx={{ borderStyle: 'dashed' }} />
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline', color:'text.primary' }}>
                새로운 메세지
              </ListSubheader>
              <Divider sx={{ borderStyle: 'dashed' }} />
              </>
            }
          >
            {alert.map((notification, index) => (
              <NotificationItem key={index} notification={notification} />
            ))}
          </List>}

          {readAlert && 
          <List
            disablePadding
            subheader={
              <>
              <Divider sx={{ borderStyle: 'dashed' , mt:3}} />
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline', color:'text.primary' }}>
                지난 메세지
              </ListSubheader>
               <Divider sx={{ borderStyle: 'dashed' }} />
               </>
            }
          >
            {readAlert.map((notification, index) => (
              <NotificationItem key={index} notification={notification} />
            ))}
          </List>}
        </Scrollbar>

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            전체보기
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

 NotificationItem.propTypes = {
  notification: PropTypes.string
}; 

function NotificationItem({ notification }) {
/*   const { avatar, title } = renderContent(notification); */
  const dispatch = useDispatch()

  const goRead = (e) => {
    dispatch(readAlert(e))
  }

  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }} src='http://attach.postzzal.com/public/files/2021/04/25/u2c7xy86z11619361591021.jpeg' />
      </ListItemAvatar>
      <ListItemText
        primary={<Button sx={{color:'text.primary'}} onClick={() => goRead(notification)} >{notification}</Button>}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
           {/*  <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)} */}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
