import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Button,
  Avatar,
  Divider,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
// utils
import { fyeardateTime } from '../../../../utils/formatTime';
import BlogPostCommentForm from './BlogPostCommentForm';

// ----------------------------------------------------------------------

BlogPostCommentItem.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  postedAt: PropTypes.string,
  newcomment: PropTypes.object,
};

export default function BlogPostCommentItem({ name, avatarUrl, message, postedAt, newcomment }) {
  const [openReply, setOpenReply] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(true);
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 32, height: 32 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled',
                }}
              >
                {fyeardateTime(postedAt)}
              </Typography>
               <Typography component="span" variant="body2" sx={{color:'text.primary'}}>
                {/* <strong>{tagUser}</strong> */} {message}
              </Typography> 
            </>
          }
        />
      </ListItem>
      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`,
        }}
      />
    </>
  );
}
