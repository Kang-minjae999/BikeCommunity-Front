import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  children: PropTypes.node
};


export default function RoleBasedGuard({ children }) {
  const { user } = useAuth()

  if (user?.role === 'guest') {
    return <Navigate to={PATH_AUTH.loginafter} />
  }

  return <>{children}</>;
}
