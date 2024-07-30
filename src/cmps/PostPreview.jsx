import React, { useState } from "react";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LikeIcon from "../assets/svg/Like.jsx";
import { LikeFilled } from "../assets/svg/LikeFilled.jsx";
import CommentIcon from "../assets/svg/Comment.jsx";
import ShareIcon from "../assets/svg/Share.jsx";
import SaveIcon from "../assets/svg/Save.jsx";
import { PostMenu } from "./PostOptions";
import { postService } from "../services/posts.service";
import { timeSince } from "../services/timeSince";
import { useSearchParams } from "react-router-dom";
import { Author } from "./Author.jsx";
import { AddComment } from "./AddComment.jsx";

function PostPreview({
  id,
  user,
  postImage,
  likes,
  timestamp,
  fetchPosts,
  comments,
  text = "",
  setEditedPostId,
  currentUser,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [params, setParams] = useSearchParams();

  const openDetails = () => {
    params.append("postId", id);
    setParams(params);
  };

  const handleDelete = async () => {
    console.log("delete post", id);
    const result = await postService.deletePost(id);
    if (result.success) {
      fetchPosts();
      console.log("post deleted", result);
      setIsMenuOpen(false);
    } else {
      console.log("error deleting post", result);
    }
  };

  const handleEditClick = () => {
    setEditedPostId(id);
    setIsMenuOpen(false);
  };

  const isLiked = likes.includes(currentUser?.id);

  const onLikeClick = async () => {
    await postService.editPost(id, {
      likes: isLiked
        ? likes.filter((like) => like !== currentUser.id)
        : [...likes, currentUser.id],
    });
    await fetchPosts();
  };

  return (
    <div className="post">
      <div className="post__header">
        <Author
          name={user?.name}
          imageUrl={user?.imageUrl || postImage}
          timestamp={timestamp}
        />
        <MoreHorizIcon onClick={() => setIsMenuOpen((isOpen) => !isOpen)} />
        {isMenuOpen && (
          <PostMenu
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            onDeleteClick={handleDelete}
            onEditClick={handleEditClick}
          />
        )}
      </div>
      <div className="post__image">
        <img onClick={openDetails} src={postImage} alt="Upload" />
      </div>
      <div className="post__footer">
        <div className="post__footerIcons">
          <div className="post__iconsMain">
            {isLiked ? (
              <LikeFilled className="postIcon" onClick={onLikeClick} />
            ) : (
              <LikeIcon className="postIcon" onClick={onLikeClick} />
            )}
            <CommentIcon className="postIcon" />
            <ShareIcon className="postIcon" />
          </div>
          <div className="post__iconsSave">
            <SaveIcon className="postIcon" />
          </div>
        </div>
        {likes.length > 0 &&
          `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        <br />
        {user?.name || "Guest"} <br />
        <br />
        <div>
          {comments?.slice(0, 3)?.map((comment) => {
            return (
              <div>
                {comment.user.name}: {comment.text}
              </div>
            );
          })}
        </div>
        {comments?.length && (
          <div onClick={openDetails}>View all {comments?.length} comments</div>
        )}
        <span className="post__description">{text}</span>
        <AddComment
          postId={id}
          commenterId={currentUser.id}
          fetchPosts={fetchPosts}
          comments={comments}
        />
      </div>
    </div>
  );
}

export default PostPreview;
