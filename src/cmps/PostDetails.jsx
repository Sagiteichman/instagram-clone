import { useNavigate, useSearchParams } from 'react-router-dom'
import { Comment } from './Comment'
import { AddComment } from './AddComment'
import { timeSince } from '../services/timeSince'

// icons
import LikeIcon from '../assets/svg/Like.jsx'
import CommentIcon from '../assets/svg/Comment.jsx'
import ShareIcon from '../assets/svg/Share.jsx'
import SaveIcon from '../assets/svg/Save.jsx'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export const PostDetails = ({ selectedPost, currentUser, fetchPosts }) => {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const closeModal = () => {
    params.delete('postId')
    setParams(params)
  }

  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }

  if (!selectedPost) return null

  return (
    <>
      {selectedPost && (
        <div className='postDetailsModal'>
          <div onClick={closeModal} className='postDetailsOverlay'></div>
          <div className='postDetailsContent'>
            <div className='postDetailsImage'>
              <img src={selectedPost.postImage} alt='Selected' />
            </div>
            <div className='postDetailsComments'>
              <div className='postDetailsHeader'>
                <img
                  className='avatar'
                  src={selectedPost?.user?.imageUrl}
                  alt={selectedPost?.user?.name}
                  onClick={() => navigateToProfile(selectedPost?.user?.id)}
                  style={{ cursor: 'pointer' }}
                />
                <span
                  className='username'
                  onClick={() => navigateToProfile(selectedPost?.user?.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {selectedPost?.user?.name || 'guest'}
                </span>
                <MoreHorizIcon className='moreIcon' />
              </div>
              <div className='commentsSection'>
                <div className='commentWrapper'>
                  <div className='comment'>
                    <img
                      src={selectedPost?.user?.imageUrl}
                      alt={selectedPost?.user?.name}
                      className='comment-avatar'
                      onClick={() => navigateToProfile(selectedPost?.user?.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className='comment-content'>
                      <div className='comment-header'>
                        <span
                          className='comment-username'
                          onClick={() =>
                            navigateToProfile(selectedPost?.user?.id)
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          {selectedPost?.user?.name}
                        </span>
                        <span className='comment-text'>
                          {selectedPost?.text}
                        </span>
                      </div>
                      <div className='comment-footer'>
                        <span className='comment-timestamp'>
                          {timeSince(selectedPost?.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {selectedPost?.comments?.map((comment, i) => (
                  <div key={i} className='commentWrapper'>
                    <Comment comment={comment} />
                  </div>
                ))}
              </div>
              <div className='addCommentWrapper'>
                <div className='postActions'>
                  <div className='iconsRow'>
                    <div className='leftIcons'>
                      <LikeIcon className='postIcon' />
                      <CommentIcon className='postIcon' />
                      <ShareIcon className='postIcon' />
                    </div>
                    <SaveIcon className='postIcon saveIcon' />
                  </div>
                  <div className='likes'>
                    <span className='bold'>
                      {selectedPost?.likes.length} Likes
                    </span>
                  </div>
                  <div className='timestamp'>
                    {timeSince(selectedPost?.timestamp).toLocaleString()}
                  </div>
                </div>
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
        </div>
      )}
    </>
  )
}
