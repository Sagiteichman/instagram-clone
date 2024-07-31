import { useSearchParams } from 'react-router-dom'
import { Author } from './Author'
import { Comment } from './Comment'
import { AddComment } from './AddComment'

export const PostDetails = ({ selectedPost, currentUser, fetchPosts }) => {
  const [params, setParams] = useSearchParams()

  const closeModal = () => {
    params.delete('postId')
    setParams(params)
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
                />
                <div className='userInfo'>
                  <span className='username'>
                    {selectedPost?.user?.name || 'guest'}
                  </span>
                  <span className='timestamp'>
                    {new Date(selectedPost?.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className='postDescription'>
                <Comment
                  comment={{
                    text: selectedPost?.description,
                    user: selectedPost?.user,
                  }}
                />
              </div>
              <div className='commentsSection'>
                {selectedPost?.comments?.map((comment, i) => (
                  <div key={i} className='commentWrapper'>
                    <Comment comment={comment} />
                  </div>
                ))}
              </div>
              <div className='addCommentWrapper'>
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
