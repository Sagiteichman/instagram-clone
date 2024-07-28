import React from "react";
import Suggestions from "./Suggestions.jsx";
import PostPreview from "./PostPreview.jsx";

export function PostList({ posts, fetchPosts, setEditedPostId }) {
  if (!posts.length) return <div>Loading Posts...</div>;

  return (
    <div className="timeline">
      <div className="timeline__left">
        <div className="timeline__post">
          {posts.map((post) => (
            <PostPreview
              setEditedPostId={setEditedPostId}
              key={post.id}
              fetchPosts={fetchPosts}
              {...post}
            />
          ))}
        </div>
      </div>
      <div className="timeline__right">
        <Suggestions />
      </div>
    </div>
  );
}
