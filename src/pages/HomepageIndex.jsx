import React, { useEffect, useState } from "react";
import { PostList } from "../cmps/PostList";
import { PostCompose } from "../cmps/PostCompose.jsx";
import { postService } from "../services/posts.service.js";
import { userService } from "../services/users.service.js";

export function HomepageIndex({ posts, fetchPosts, user, setEditedPostId }) {
  return (
    <div className="homepage">
      <div className="homepage__timeline">
        <PostList
          posts={posts}
          fetchPosts={fetchPosts}
          user={user}
          setEditedPostId={setEditedPostId}
        />
      </div>
    </div>
  );
}
