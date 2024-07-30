import { Avatar } from "@mui/material";
import { timeSince } from "../services/timeSince";

export const Comment = ({ comment }) => {
  console.log("comment", comment);
  return (
    <div className="comment">
      <Avatar src={comment.user?.imageUrl} alt={comment.user?.name} />
      <div className="comment_name_and_text">
        <div>
          <span>{comment.user?.name}</span>
          <span>{comment.text}</span>
        </div>
        <span>{comment.likes > 0 && comment.likes + "likes"}</span>
        <div>
          <span>{timeSince(comment.timestamp)} </span>
          <span>Reply </span>
        </div>
      </div>
      <div>like</div>
    </div>
  );
};
