import React from "react";
import { PostList } from "../cmps/PostList";

export function HomepageIndex({
  currentUser,
  posts,
  fetchPosts,
  user,
  setEditedPostId,
}) {
  return (
    <div className="homepage">
      <div className="homepage__timeline">
        <PostList
          posts={posts}
          fetchPosts={fetchPosts}
          currentUser={currentUser}
          user={user}
          setEditedPostId={setEditedPostId}
        />
      </div>
    </div>
  );
}
