import React from 'react';
import { Heart, HeartOff } from 'lucide-react';

export function LikeButton({ isLiked, likes, onToggleLike }) {
  return (
    <button
      onClick={onToggleLike}
      className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
    >
      {isLiked ? (
        <Heart size={18} className="fill-red-500 text-red-500" />
      ) : (
        <Heart size={18} />
      )}
      <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
    </button>
  );
}