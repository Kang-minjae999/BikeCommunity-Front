import PropTypes from 'prop-types';
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem} from '@mui/material';
import Iconify from './Iconify';

/* Dotdotdot.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
}; */
// 프로필이랑 채팅 링크 수정

DotdotdotPost.propTypes = {
  nicknameOfPost: PropTypes.string.isRequired,
};

export default function DotdotdotPost({nicknameOfPost}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose0 = () => {
    setAnchorEl(null);
    navigate(`/dashboard/user/profile/${nicknameOfPost}`);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
    navigate('/dashboard/chat');
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    navigate('/dashboard/blog/new-report')
  };

  return (
    <div>
    <IconButton onClick={handleClick}>
      <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
    </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose0}>프로필가기</MenuItem>
        <MenuItem onClick={handleClose1}>채팅하기</MenuItem>
        <MenuItem onClick={handleClose2}>신고하기</MenuItem>
      </Menu>
    </div>
  );
}


