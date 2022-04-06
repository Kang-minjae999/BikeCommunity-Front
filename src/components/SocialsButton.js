import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Link, Stack, Button, Tooltip, IconButton, Avatar } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

SocialsButton.propTypes = {
  initialColor: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.string),
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function SocialsButton({ initialColor = false, simple = true, links = {}, sx, ...other }) {
  const SOCIALS = [
    {
      name: 'FaceBook',
      icon: 'eva:facebook-fill',
      socialColor: '#1877F2',
      path: links.facebook || 'https://www.facebook.com/%EB%9D%BC%EC%9D%B4%EB%8D%94%ED%83%80%EC%9A%B4-106038132073040',
    },
    {
      name: 'Instagram',
      icon: 'ant-design:instagram-filled',
      socialColor: '#E02D69',
      path: links.instagram || 'https://instagram.com/rt_ridertown?utm_medium=copy_link',
    },
    {
      name: 'naverblog',
      icon: 'simple-icons:naver',
      socialColor: '#007EBB',
      path: links.linkedin || 'https://blog.naver.com/ridertown',
    },
  ];

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {SOCIALS.map((social) => {
        const { name, icon, path, socialColor } = social;
        return simple ? (
          <Link key={name} href={path} 
          target="_blank"
          rel="noopener noreferrer">
            <Tooltip title={name} placement="top" color='action'>
              <IconButton
                color="inherit"
                sx={{
                  ...(initialColor && {
                    color: 'action',
                    '&:hover': {
                      bgcolor: alpha(socialColor, 0.08),
                    },
                  }),
                  ...sx,
                }}
                {...other}
              >
                <Iconify icon={icon} sx={{ width: 20, height: 20, color:'text.primary' }} />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                '&:hover': {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
