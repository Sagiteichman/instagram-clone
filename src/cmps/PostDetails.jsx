import { useSearchParams } from "react-router-dom";
import { Author } from "./Author";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";

export const PostDetails = ({ selectedPost, currentUser, fetchPosts }) => {
  const [params, setParams] = useSearchParams();

  const closeModal = () => {
    params.delete("postId");
    setParams(params);
  };

  if (!selectedPost) return;
  return (
    <>
      {selectedPost && (
        <div className="modal">
          <div onClick={closeModal} className="overlay"></div>
          <div className="postDetails modal__content">
            <div className="img">
              <img src={selectedPost.postImage} alt="Selected" />
            </div>
            <div className="postDetails__comments">
              <Author
                name={selectedPost?.user?.name || "guest"}
                imageUrl={selectedPost?.user?.imageUrl}
                timestamp={selectedPost?.timestamp}
              />

              {selectedPost?.comments?.map((comment, i) => (
                <div className="comment_wrapper">
                  <Comment key={i} comment={comment} />
                </div>
              ))}
              <AddComment
                commenterId={currentUser.id}
                comments={selectedPost.comments}
                postId={selectedPost.id}
                fetchPosts={fetchPosts}
                showPostButton={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
