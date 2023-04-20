// src/components/PostList.js
import React from "react";

function PostList({ posts, onPostClick }) {
  const handleClick = (post) => {
    onPostClick(post);
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => handleClick(post)}
          className="p-4 border-b border-gray-200 cursor-pointer"
        >
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
