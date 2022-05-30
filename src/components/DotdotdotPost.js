import PropTypes from 'prop-types';
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem} from '@mui/material';
import Iconify from './Iconify';
import useAuth from '../hooks/useAuth'
import axios from '../utils/axios'
import { access, refresh } from '../utils/jwt';

DotdotdotPost.propTypes = {
  nicknameOfPost: PropTypes.string.isRequired,
  id: PropTypes.number,
};

export default function DotdotdotPost({nicknameOfPost, id}) {
  const { user } = useAuth()
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
  const handleClose3 = async () => {
      try {
        await axios.delete(`/post-service/posts/${id}`, {
          headers: {
            accessToken: access,
            refreshToken: refresh,
          },
        });
        navigate(-1);
      } catch (error) {
        console.error(error);
      }
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
       {user?.nickname === nicknameOfPost && <MenuItem onClick={handleClose3}>삭제하기</MenuItem>}
      </Menu>
    </div>
  );
}


