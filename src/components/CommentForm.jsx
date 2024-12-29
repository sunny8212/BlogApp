import React, { useState } from 'react';

export function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState({ author: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment({ author: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="comment-author" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="comment-author"
          value={comment.author}
          onChange={(e) => setComment({ ...comment, author: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="comment-content" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="comment-content"
          rows={3}
          value={comment.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Add Comment
      </button>
    </form>
  );
}