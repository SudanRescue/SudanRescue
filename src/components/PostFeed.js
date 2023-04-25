import React from "react";

const PostFeed = ({ posts, onPostClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => onPostClick(post)}
          className="border p-4 cursor-pointer hover:bg-gray-200"
        >
          <h3 className="font-bold mb-2">{post.description}</h3>
          <p>
            Location: {post.latitude}, {post.longitude}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
