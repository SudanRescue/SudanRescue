import React, { useState } from 'react';

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(e, title, content);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmitForm} className="mt-4">
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        Post Title
      </label>
      <div className="mt-1">
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mt-4">
        Post Content
      </label>
      <div className="mt-1">
        <textarea
          id="content"
          name="content"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Post
      </button>
    </form>
  );
}

export default PostForm;
