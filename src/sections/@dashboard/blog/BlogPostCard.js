import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { Link as RouterLink , useLocation} from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import TextIconLabel from '../../../components/TextIconLabel';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post }) {
  const isDesktop = useResponsive('up', 'md');

  const { id, nicknameOfpost, thumbnailImageUrl ,content } = post;

 /*  const latestPost = index === 0 || index === 1 || index === 2;

  if (isDesktop && latestPost) {
    return (
       <Card>
        <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{
            zIndex: 9,
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            position: 'absolute',
          }}
        />
        <PostContent title={title} view={view} comment={comment} share={share} createdAt={createdAt} index={index} />
        <OverlayStyle />
        <Image alt="cover" src={cover} sx={{ height: 360 }} />
      </Card> 
      <Card>
      <PostContent title={content}  index={index} />
      <OverlayStyle />
      <Image alt="cover" src={thumbnailImageUrl} sx={{ height: 360 }} />
    </Card>
    );
  } */

  return (
/*     <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
        <Image alt="cover" src={cover} ratio="4/3" />
      </Box>

      <PostContent title={title} view={view} comment={comment} share={share} createdAt={createdAt} id={id} />
    </Card> */
    <Card>
    <Box sx={{ position: 'relative' }}>
      <SvgIconStyle
        src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
        sx={{
          width: 80,
          height: 36,
          zIndex: 9,
          bottom: -15,
          position: 'absolute',
          color: 'background.paper',
        }}
      />
      <Image alt="cover" src={thumbnailImageUrl} ratio="4/3" />
    </Box>

    <PostContent content={content} id={id} nicknameOfpost={nicknameOfpost} thumbnailImageUrl={thumbnailImageUrl} />
  </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
  nicknameOfpost: PropTypes.string,
  thumbnailImageUrl: PropTypes.string,
};

export function PostContent({  id, nicknameOfpost, thumbnailImageUrl ,content }) {
  const isDesktop = useResponsive('up', 'md');

  const { pathname } = useLocation();

  const [api , setapi] = useState();

  useEffect(() => {
    if(pathname.includes('notices')){
      setapi('notices')
    }
    if(pathname.includes('posts')){
      setapi('posts')
    }
    if(pathname.includes('dingstas')){
      setapi('dingstas')
    }
  }, [pathname])

  const linkTo = `${PATH_DASHBOARD.blog.root}/${api}/${id}`;

/*   const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2; */

/*   const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ]; */

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1
      }}
    >
      {/* <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography> */}

      <Link to={linkTo} color="inherit" component={RouterLink}>
        <TextMaxLine variant='subtitle2' line={2} persistent>
          {content}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
        }}
      >
      {/*   {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))} */}
      </Stack>
    </CardContent>
  );
}
