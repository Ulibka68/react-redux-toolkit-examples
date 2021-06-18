import React from 'react';
import { useDispatch } from 'react-redux';

import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

// eslint-disable-next-line react/prop-types
export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  /* eslint-disable react/prop-types */

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
