import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';
//
import BlogPostCommentItem from './BlogPostCommentItem';

// ----------------------------------------------------------------------

BlogPostCommentList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCommentList({ post }) {
  const { comments } = post;

  return (
    <List disablePadding>
      {comments.map((comment, index) => {
        const { nicknameOfComment, avatarImageURL, createdDate ,content} = comment;
        /* const hasReply = replyComment.length > 0; */
        const key = `comment ${index}`

        return (
          <Box key={key} sx={{}}>
            <BlogPostCommentItem
              name={nicknameOfComment}
              avatarUrl={avatarImageURL}
              postedAt={createdDate}
              message={content}
            />
            {/* {hasReply &&
              replyComment.map((reply) => {
                const user = users.find((user) => user.id === reply.userId);
                return (
                  <BlogPostCommentItem
                    key={reply.id}
                    message={reply.message}
                    tagUser={reply.tagUser}
                    postedAt={reply.postedAt}
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                    hasReply
                  />
                );
              })} */}
          </Box>
        );
      })}
    </List>
  );
}
