import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Card, Avatar, Typography, CardContent, Stack, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fyeardateTime } from '../../../utils/formatTime';
import { fNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import TextIconLabel from '../../../components/TextIconLabel';


// ----------------------------------------------------------------------

BlogPostlist.propTypes = {
  post: PropTypes.object.isRequired,
};
/* 
const { title, id, createdAt } = post; */

export default function BlogPostlist({ post }) {
  const { title, id } = post;

/*   const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
  ]; */

  return (
    <Card sx={{mb:0.5}}>
      <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >  
      <Grid container>
      <Grid key={post.id} item xs={12} sm={12} md={8}>
      <PostContent title={title} id={id} />
      </Grid>
      <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >  
        
      <Avatar
          alt='ridertown'
          src='https://en.pimg.jp/068/513/753/1/68513753.jpg'
        />
        <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'secondary'
        }}
      >라이더타운</Typography>

{/*        <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          color: 'secondary'
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack> */}

{/*       <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'secondary'
        }}
      >
        
        {fyeardateTime(createdAt)}
      </Typography> */} 

      </Stack>
      </Grid> 
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};

export function PostContent({ title, id}) {
  
  const linkTo = `${PATH_DASHBOARD.blog.root}/notice/${id}`;


  return (
    <CardContent
      sx={{
        pt: 3,
        width: 1,
      }}
    >
    <Stack        
     direction="row"
     alignItems="center"
     justifyContent="space-between"
        sx = {{mr:4}}>

      <Link to={linkTo} color="inherit" component={RouterLink}>
        <TextMaxLine variant={'subtitle2'} line={1} persistent>
          {title}
        </TextMaxLine>
      </Link>
      </Stack>
    </CardContent>
  );
}
