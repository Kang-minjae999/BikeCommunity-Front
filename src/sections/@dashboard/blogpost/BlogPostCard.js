import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack, Chip } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
// utils
import { fyeardateTime } from '../../../utils/formatTime';
import { fNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import TextIconLabel from '../../../components/TextIconLabel';

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCard({ post }) {
  const { id, thumbnailImageURL, content, createdDate, tags ,view , heart, numOfComment} = post;

  const [api, setapi] = useState('');
  const linkTo = `${PATH_DASHBOARD.blog.root}/${api}/${id}`;
  const { pathname } = useLocation();


  useEffect(() => {
    if (pathname.includes('notices')) {
      setapi('notice');
    }
    if (pathname.includes('posts')) {
      setapi('post');
    }
    if (pathname.includes('dingstas')) {
      setapi('dingsta');
    }
  }, [pathname]);

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
          <Avatar
            alt='RIDERTOWN'
            src='https://mblogthumb-phinf.pstatic.net/MjAyMDAxMjlfMTM1/MDAxNTgwMjczNzQ0NjM3.o6Fk0PSmpz0KPLJM70MVySVyPieGn6BdP6fMvEhxpGgg.Q9xDDds9VOO78rp4fvGlDZGyfBt1B9lrAPekSE6EO4sg.JPEG.bikebaksa/imageView_%282%29.jpg?type=w2'
            sx={{ width: 32, height: 32, mt: 1, mb: 1, ml: 1, mr: 1 }}
          />
          <Typography variant="subtitle2" sx={{ color: 'common.black' }}>
            라이더타운
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ position: 'relative' }}>
      <Link to={linkTo} color="inherit" component={RouterLink}>
        <Image alt="cover" src={thumbnailImageURL} ratio="1/1" />
        </Link>
      </Box>
      <PostContent content={content} createdDate={createdDate} id={id} tags={tags} view={view} heart={heart} numOfComment={numOfComment}/>
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  id: PropTypes.number,
  view: PropTypes.number,
  heart: PropTypes.number,
  numOfComment: PropTypes.number,
  content: PropTypes.string,
  createdDate: PropTypes.string,
  tags: PropTypes.array,
};

export function PostContent({ id, content, createdDate, tags, view, heart, numOfComment}) {
  const { pathname } = useLocation();

  const [api, setapi] = useState();

  useEffect(() => {
    if (pathname.includes('notices')) {
      setapi('notice');
    }
    if (pathname.includes('posts')) {
      setapi('post');
    }
    if (pathname.includes('dingstas')) {
      setapi('dingsta');
    }
  }, [pathname]);

  const linkTo = `${PATH_DASHBOARD.blog.root}/${api}/${id}`;

  const POST_INFO = [
    { number: view, icon: 'eva:eye-fill' },
    { number: numOfComment, icon: 'eva:message-circle-fill' },
    { number: heart, icon: 'eva:heart-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
        }}
      >
        {fyeardateTime(createdDate)}
      </Typography>

      <Link to={linkTo} color="inherit" component={RouterLink}>
        <TextMaxLine variant="subtitle2" line={2} persistent>
          {content}
        </TextMaxLine>
      </Link>
      {tags && (
        <Box sx={{ py: 3 }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} sx={{ m: 0.5 }} size="small" />
          ))}
        </Box>
      )}
      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 0.5,
          color: 'text.disabled',
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fNumber(info.number)}
            sx={{ typography: 'caption', ml: 1 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}
