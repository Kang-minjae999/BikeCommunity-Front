import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { common } from '@mui/material/colors';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, Link, Box } from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import MopedIcon from '@mui/icons-material/Moped';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';

// ----------------------------------------------------------------------
import { SeoIllustration } from '../../../../assets';
import { AppWelcomesecond } from '.';
// ----------------------------------------------------------------------
export default function AppWelcome() {
  return (
    <div>
    <SportsMotorsportsIcon fontSize='small'/> <TwoWheelerIcon fontSize='small'/> <MopedIcon fontSize='small'/>
    </div>
  );
}
