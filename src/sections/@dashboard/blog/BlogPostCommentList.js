import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { Box, List } from '@mui/material';
//
import BlogPostCommentItem from './BlogPostCommentItem';
import BlogPostCommentForm from './BlogPostCommentForm';
import BlogPostCommentItemNew from './BlogPostCommentItemNew';
// ----------------------------------------------------------------------

BlogPostCommentList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCommentList({ post }) {
  const { comments, id } = post;
  const [comment, setComment] = useState([]);

  return (
    <>
    <List disablePadding>
      {comments.map((comment, index) => {
        const { nicknameOfComment, avatarImageURL, createdDate ,content} = comment;
        const key = `comment ${index}`

        return (
          <Box key={key} >
            <BlogPostCommentItem
              name={nicknameOfComment}
              avatarUrl={avatarImageURL}
              postedAt={createdDate}
              message={content}
            />
          </Box>
        );
      })}
      <>      
      {comment.map((comment, index) => {
        const key = `comment ${index}`
        return (
          <Box key={key} >
            <BlogPostCommentItemNew
              message={comment}
            />
          </Box>
        );
      })}
      </>
    </List>
   <BlogPostCommentForm id={id} comment={comment} setComment={setComment} />
   </>
  );
}
