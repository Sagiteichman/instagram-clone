import { useSearchParams } from 'react-router-dom'
import { Author } from './Author'

export const PostDetails = ({ selectedPost }) => {
  const [params, setParams] = useSearchParams()

  const closeModal = () => {
    params.delete('postId')
    setParams(params)
  }

  const exampleComments = new Array(7).fill(undefined)
  return (
    <>
      {selectedPost && (
        <div className='modal'>
          <div onClick={closeModal} className='overlay'></div>
          <div className='postDetails modal__content'>
            <div className='img'>
              <img src={selectedPost.postImage} alt='Selected' />
            </div>
            <div className='postDetails__comments'>
              <Author
                name={selectedPost.user.name}
                imageUrl={selectedPost.user?.imageUrl}
                timestamp={selectedPost.timestamp}
              />

              {selectedPost.comments.map((_, i) => (
                <div key={i} className='comment'>
                  <div className='comment_name_and_text'>
                    <Author
                      name={_.userName}
                      imageUrl={_.userImgUrl}
                      timestamp={_.timestamp}
                    />
                    <span>{_.text}</span>
                  </div>
                  <div>
                    <span>{_.timestamp}</span>
                    <span>{_.likes > 0 && _.likes + 'likes'}</span>
                    <span>Reply</span>
                    <span>See translation</span>
                    <span>...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
