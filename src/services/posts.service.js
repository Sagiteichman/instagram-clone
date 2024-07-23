// posts.service.js
import { storageService } from './storage.service.js'

const POST_KEY = 'postDB'

function _createPosts() {
  let posts = storageService.loadFromStorage(POST_KEY)
  if (!posts || !posts.length) {
    posts = [
      {
        id: '1',
        user: 'Jude',
        postImage:
          'https://e0.365dm.com/23/11/1600x900/skysports-jude-bellingham-real-madrid_6377097.jpg?20231129223659.',
        likes: 43,
        timestamp: 'just now',
      },
      {
        id: '2',
        user: 'Valverde',
        postImage:
          'https://cms.sabcsport.com/storage/images/1024x768_federico-valverde-of-real-madrid-5-nov-jpg_572x322.webp',
        likes: 108,
        timestamp: '4h',
      },
      {
        id: '3',
        user: 'Modrich',
        postImage:
          'https://static.independent.co.uk/2023/05/08/17/22-83f076e3fa8d42368c0a517d78e6af6c.jpg?quality=75&width=1000&crop=3%3A2%2Csmart&auto=webp',
        likes: 51,
        timestamp: '1w',
      },
      {
        id: '4',
        user: 'Kross',
        postImage:
          'https://pbs.twimg.com/media/GOGV0tdXcAAsnGk?format=jpg&name=900x900',
        likes: 153,
        timestamp: '4d',
      },
    ]
    storageService.saveToStorage(POST_KEY, posts)
  }
}

function getPosts() {
  return storageService.loadFromStorage(POST_KEY) || []
}

_createPosts()

export const postService = {
  getPosts,
}
