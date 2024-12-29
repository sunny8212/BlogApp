import React from 'react';
import { MessageCircle } from 'lucide-react';

export function CommentList({ comments }) {
  if (!comments?.length) {
    return (
      <div className="text-gray-500 text-sm flex items-center gap-1">
        <MessageCircle size={16} />
        <span>No comments yet</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
          <p className="text-sm text-gray-600">{comment.content}</p>
          <div className="mt-1 text-xs text-gray-500">
            By {comment.author} on {new Date(comment.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}