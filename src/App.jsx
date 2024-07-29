import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { HomepageIndex } from "./pages/HomepageIndex.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import "./assets/main.scss";
import Sidenav from "./cmps/Sidenav.jsx";
import { userService } from "./services/users.service.js";
import { postService } from "./services/posts.service.js";
import { PostCompose } from "./cmps/PostCompose.jsx";
import { PostDetails } from "./cmps/PostDetails.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [editedPostId, setEditedPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isComposeModalOpen, setComposeModalOpen] = useState(false);
  const [params] = useSearchParams();

  const selectedPostId = params.get("postId");

  const fetchPosts = async () => {
    const posts = await postService.getPosts();
    setPosts(posts);
  };

  const fetchUser = async () => {
    const user = await userService.getUserById("1");
    setUser(user);
  };

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  const editedPost = posts.find((post) => post.id === editedPostId);
  const selectedPost = posts.find((post) => post.id === selectedPostId);
  const shouldShowComposeModal = editedPost || isComposeModalOpen;

  const toggleComposeModal = () => {
    setComposeModalOpen(!shouldShowComposeModal);
    setEditedPostId(null);
  };

  return (
    <>
      <Sidenav toggleModal={toggleComposeModal} user={user} />{" "}
      <Routes>
        <Route path="/" element={<HomepageIndex user={user} posts={posts} />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <PostCompose
        user={user}
        shouldShowComposeModal={shouldShowComposeModal}
        toggleModal={toggleComposeModal}
        fetchPosts={fetchPosts}
        post={editedPost}
      />
      <PostDetails selectedPost={selectedPost} />
    </>
  );
}

export default App;
