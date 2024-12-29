import React, { useState } from 'react';
import { PenSquare } from 'lucide-react';
import { BlogCard } from './components/BlogCard';
import { BlogForm } from './components/BlogForm';
import { Modal } from './components/Modal';
import { CommentForm } from './components/CommentForm';
import { CommentList } from './components/CommentList';

// Mock data with complete post structure
const initialPosts = [
  {
    id: '1',
    title: 'The Power of Clean Code in Software Development',
    content: 'Clean code is essential for ensuring that software is not only functional but also maintainable and scalable. It refers to writing code that is easy to read, understand, and modify. Using meaningful names for variables, methods, and classes, adhering to coding standards, and keeping functions concise and focused are key practices. Clean code improves collaboration among developers and significantly reduces the time required to debug and add new features, ensuring long-term project success.',
    author: 'Harsh',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 3,
    isLiked: false,
    comments: [],
  },
  {
    id: '2',
    title: 'React.js: A Beginner’s Guide to Building Dynamic User Interfaces',
    content: 'React.js has revolutionized the way developers build user interfaces. By using components that can be reused and dynamically updated, React allows for fast, responsive, and interactive web applications. Its virtual DOM system ensures that only necessary changes are made to the UI, making the application more efficient. For beginners, learning React provides a solid foundation in modern JavaScript development and opens the door to building interactive web applications with ease.',
    author: 'Ankit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 0,
    isLiked: false,
    comments: [],
  },
  {
    id: '3',
    title: 'Exploring the Future of Artificial Intelligence in Everyday Life',
    content: 'Artificial Intelligence (AI) is rapidly transforming how we live, work, and interact with the world. From virtual assistants like Siri to self-driving cars, AI is already embedded in many aspects of daily life. The future of AI holds even more exciting possibilities, including personalized healthcare, smart homes, and advanced robotics. As AI technology continues to evolve, it will unlock new opportunities and challenges, reshaping industries and enhancing our daily experiences in ways we can only begin to imagine.',
    author: 'Sunny',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 0,
    isLiked: false,
    comments: [],
  },
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleCreatePost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      comments: [],
    };
    setPosts([post, ...posts]);
    setIsFormOpen(false);
  };

  const handleUpdatePost = (updatedPost) => {
    if (!selectedPost) return;
    const updated = {
      ...selectedPost,
      ...updatedPost,
      updatedAt: new Date().toISOString(),
    };
    setPosts(posts.map((post) => (post.id === selectedPost.id ? updated : post)));
    setSelectedPost(null);
    setIsFormOpen(false);
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const handleToggleLike = (postId) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now().toString(),
              ...comment,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <PenSquare size={20} />
              New Post
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onEdit={(post) => {
                setSelectedPost(post);
                setIsFormOpen(true);
              }}
              onDelete={handleDeletePost}
              onClick={(post) => {
                setSelectedPost(post);
                setIsViewOpen(true);
              }}
              onToggleLike={() => handleToggleLike(post.id)}
            />
          ))}
        </div>
      </main>

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedPost(null);
        }}
        title={selectedPost ? 'Edit Post' : 'Create New Post'}
      >
        <BlogForm
          post={selectedPost}
          onSubmit={selectedPost ? handleUpdatePost : handleCreatePost}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedPost(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedPost(null);
        }}
        title={selectedPost?.title ?? ''}
      >
        {selectedPost && (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-sm text-gray-500">
                By {selectedPost.author} on{' '}
                {new Date(selectedPost.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 whitespace-pre-wrap">{selectedPost.content}</div>
            </div>
            
            <hr className="my-6" />
            
            <CommentList comments={selectedPost.comments} />
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h3>
              <CommentForm onSubmit={(comment) => handleAddComment(selectedPost.id, comment)} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;