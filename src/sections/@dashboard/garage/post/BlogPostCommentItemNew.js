import PropTypes from 'prop-types';
// @mui
import {
  Avatar,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
// utils
import { fyeardateTime } from '../../../../utils/formatTime';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

BlogPostCommentItemNew.propTypes = {
  message: PropTypes.string,
};

export default function BlogPostCommentItemNew({ message }) {

  const { user } = useAuth()

  const date = new Date()

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
          <Avatar alt={user?.nickname} src={user?.avatar} sx={{ width: 32, height: 32 }} />
        </ListItemAvatar>

        <ListItemText
          primary={user?.nickname}
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
                {fyeardateTime(date)}
              </Typography>
               <Typography component="span" variant="body2" sx={{color:'text.primary'}}>
                {message}
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
