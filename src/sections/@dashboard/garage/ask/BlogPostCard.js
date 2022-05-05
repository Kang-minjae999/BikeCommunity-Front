import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack, Chip, Divider } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import { MotionContainer, varFade } from '../../../../components/animate';
import axios from '../../../../utils/axiospost';
import { fyeardateTime } from '../../../../utils/formatTime';
import { fNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import TextMaxLine from '../../../../components/TextMaxLine';
import TextIconLabel from '../../../../components/TextIconLabel';
import DotdotdotPost from '../../../../components/DotdotdotPost';
import BlogDingstaForStas from '../../../../pages/dashboard/BlogDingstaForStas';

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCard({ post }) {
  const { id, nicknameOfPost, thumbnailImageUrl, content, createdDate, avatarImageURL, tags ,view , heart, numOfComment} = post;

  const linkToProfile = `${PATH_DASHBOARD.user.profile}/${nicknameOfPost}`;

  const [detail, setDetail] = useState(false)

  const isMountedRef = useIsMountedRef();

  const [postClick, setPostClick] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/dingsta/${id}`);

      if (isMountedRef.current) {
        setPostClick(response.data.data);
      }
    } catch (error) {
      console.error(error);
      setError('서버와의 연결이 이상해요!');
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getPost();
  }, [getPost]);



  return (
    <>
    {(!detail || !postClick) && <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        <Link to={linkToProfile} color="inherit" component={RouterLink}>
          <Avatar
            alt={nicknameOfPost}
            src={avatarImageURL}
            sx={{ width: 32, height: 32, mt: 1, mb: 1, ml: 1, mr: 1 }}
          />
        </Link>
        <Link to={linkToProfile} color="action" component={RouterLink}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {nicknameOfPost}
          </Typography> 
          </Link>
        </Stack>
        <DotdotdotPost nicknameOfPost={nicknameOfPost}/>
      </Stack>
      <Divider />
      <Box sx={{ position: 'relative' }}>
      <Link onClick={() => setDetail(!detail)}  color="inherit">
        <Image alt={nicknameOfPost} src={thumbnailImageUrl} ratio="1/1" />
        </Link>
      </Box>
      <Divider />
      <PostContent content={content} createdDate={createdDate} 
      id={id} tags={tags} view={view} heart={heart} numOfComment={numOfComment} detail={detail} setDetail={setDetail} />
    </Card>}
   {(detail && postClick) && 
      <MotionContainer> 
        <m.div variants={varFade().in}>
         <BlogDingstaForStas postClick={postClick} error={error}/>
        </m.div> 
      </MotionContainer>}
   </>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  view: PropTypes.number,
  heart: PropTypes.number,
  numOfComment: PropTypes.number,
  content: PropTypes.string,
  createdDate: PropTypes.string,
  tags: PropTypes.array,
  detail: PropTypes.bool,
  setDetail: PropTypes.func,
};

export function PostContent({ content, createdDate, tags, view, heart, numOfComment, detail , setDetail}) {

  const POST_INFO = [
    { number: view, icon: 'eva:eye-fill' },
    { number: numOfComment, icon: 'eva:message-circle-fill' },
    { number: heart, icon: 'eva:heart-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 2,
        width: 1,
      }}
    >

      <Link onClick={() => setDetail(!detail)} color="inherit" >
        <TextMaxLine variant="subtitle2" line={1} persistent>
          {content}
        </TextMaxLine>
      </Link>
      {tags && (
        <Box sx={{ mt: 2 }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} sx={{ mr: 0.5 }} size="small" />
          ))}
        </Box>
      )}
      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 2,
          color: 'text.disabled',
        }}
      >
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
        }}
      >
        {fyeardateTime(createdDate)}
      </Typography>
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
