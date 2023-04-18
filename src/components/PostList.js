import React from 'react';

function PostList({ posts }) {
  return (
    <div className="mt-6 space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
          <p>{post.content}</p>
          <p className="text-gray-500 text-sm">Lat: {post.latitude}, Lng: {post.longitude}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
