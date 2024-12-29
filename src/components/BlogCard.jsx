import React from 'react';
import { Calendar, Clock, Edit, Trash2, MessageCircle } from 'lucide-react';
import { LikeButton } from './LikeButton';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { Modal } from './Modal';
import { BlogForm } from './BlogForm';

export function BlogCard({ post, onEdit, onDelete, onClick, onToggleLike }) {
  return (
    
    <div className="bg-zinc-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 
        onClick={() => onClick(post)}
        className="text-2xl font-bold mb-2 text-gray-800 hover:text-blue-600 cursor-pointer"
      >
        {post.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {new Date(post.updatedAt).toLocaleTimeString()}
          </span>
          <LikeButton
            isLiked={post.isLiked}
            likes={post.likes}
            onToggleLike={() => onToggleLike(post.id)}
          />
          <span className="flex items-center gap-1">
            <MessageCircle size={16} />
            {(post.comments?.length || 0)} {post.comments?.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(post)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <CommentList/>
      
    </div>
  );
}
