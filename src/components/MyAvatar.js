// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();
  //  {createAvatar(user?.avatar).name}
  //   </Avatar> 

  return (
    <Avatar
      src={user?.avatar}
      alt={user?.nickname}
      color={user?.avatar ? 'default' : createAvatar(user?.avatar).color}
      {...other}
    />
  );
}
