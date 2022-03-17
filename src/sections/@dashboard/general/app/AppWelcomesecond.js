import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// ------------------------------------------------
import StoreIcon from '@mui/icons-material/Store';

// ------------------------------------------------
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const pages = ['중고바이크', '센터중고바이크', '동호회','게시판','포스트'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
      { title: (<Typography color='black' variant='subtitle2'> <StoreIcon /> 신품구매</Typography>), path: PATH_DASHBOARD.usedeCommerce.root },
      { title: '신차바이크', path: PATH_DASHBOARD.eCommerce.root },
      { title: '게시판', path: PATH_DASHBOARD.board.motocycle },
      { title: '포스트', path: PATH_DASHBOARD.blog.Motocyclearticle},
]

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" color='inherit'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
{/*           <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
          >
            Go to
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {navConfig.map((name) => (
              
              <Button
                key={name.title}
                component={RouterLink}
                to={name.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {name.title}
              </Button>

            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;