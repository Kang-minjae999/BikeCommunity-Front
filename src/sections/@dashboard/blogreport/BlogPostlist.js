import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Card, Avatar, Typography, CardContent, Stack, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
// utils
import { fyeardateTime } from '../../../utils/formatTime';
// components
import TextMaxLine from '../../../components/TextMaxLine';


// ----------------------------------------------------------------------

BlogPostlist.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostlist({ post }) {
  const { title, id, nicknameOfPost ,createdDate } = post;
  return (
    <Card >
      <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >  
      <Grid container>
      <Grid item xs={7} sm={7} md={7}>
      <PostContent title={title} id={id} />
      </Grid>
      <Grid  item xs={2} sm={2} md={2}>
        <Typography
        variant="caption"
        component="div"
        sx={{
          color: 'secondary'
        }}
      >{nicknameOfPost}</Typography>
      </Grid> 

    <Grid  item xs={3} sm={3} md={3}>
       <Typography
        variant="caption"
        component="div"
        sx={{
          color: 'secondary'
        }}
      >
        
        {fyeardateTime(createdDate)}
      </Typography> 
      </Grid> 
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
  
  const linkTo = `${PATH_DASHBOARD.blog.root}/report/${id}`;


  return (
      <Link to={linkTo} color="inherit" component={RouterLink}>
        <TextMaxLine variant={'subtitle2'} line={1} persistent>
          {title}
        </TextMaxLine>
      </Link>
  );
}
