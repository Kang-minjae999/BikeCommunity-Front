import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const role = 'admin';
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>권한이 없어요!</AlertTitle>
          다른페이지로 이동해주세요!
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
