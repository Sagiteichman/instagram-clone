import { useSearchParams } from "react-router-dom";
import { Author } from "./Author";

export const PostDetails = ({ selectedPost }) => {
  const [params, setParams] = useSearchParams();

  const closeModal = () => {
    params.delete("postId");
    setParams(params);
  };

  const exampleComments = new Array(10).fill(undefined);
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
                name={selectedPost.user.name}
                imageUrl={selectedPost.user?.imageUrl}
                timestamp={selectedPost.timestamp}
              />
              {exampleComments.map((_, i) => (
                <div key={i} className="comment">
                  <Author
                    name={selectedPost.user.name}
                    imageUrl={selectedPost.user?.imageUrl}
                    timestamp={selectedPost.timestamp}
                  />
                  <p>{selectedPost.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
