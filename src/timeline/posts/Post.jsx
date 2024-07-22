import { Avatar } from '@mui/material'
import React from 'react'
import './Post.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutLineIcon from '@mui/icons-material/ChatBubbleOutline'
import TelegramIcon from '@mui/icons-material/Telegram'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

function Post() {
  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__headerAuthor'>
          <Avatar>J</Avatar>
          Jude • <span>12h</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className='post__image'>
        <img
          src='data:image/webp;base64,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b24gSnVseSAxMywgMjAyNCBpbiBCbGFua2VuaGFpbiwgR2VybWFueS4gKFBob3RvIGJ5IFJpY2hhcmQgUGVsaGFtL0dldHR5IEltYWdlcykyMDI0IEdldHR5IEltYWdlcywBAAABAAAALAEAAAEAAAAAWE1QIKMGAABodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgZGM6UmlnaHRzPSIyMDI0IEdldHR5IEltYWdlcyIgcGhvdG9zaG9wOkNyZWRpdD0iR2V0dHkgSW1hZ2VzIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iMjE2MTg2MzYyNSIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuZ2V0dHlpbWFnZXMuY29tL2V1bGE/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmwiIHBsdXM6RGF0YU1pbmluZz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi92b2NhYi9ETUktUFJPSElCSVRFRC1FWENFUFRTRUFSQ0hFTkdJTkVJTkRFWElORyIgPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPlJpY2hhcmQgUGVsaGFtPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5CTEFOS0VOSEFJTiwgR0VSTUFOWSAtIEpVTFkgMTM6IEp1ZGUgQmVsbGluZ2hhbSBvZiBFbmdsYW5kIHJlYWN0cyBhcyBoZSB3YXJtcyB1cCBkdXJpbmcgdGhlIEVuZ2xhbmQgVHJhaW5pbmcgU2Vzc2lvbiBhaGVhZCBvZiB0aGUgVUVGQSBFVVJPIDIwMjQgZmluYWwgbWF0Y2ggYmV0d2VlbiBTcGFpbiBhbmQgRW5nbGFuZCBhdCBTcGEgJmFtcDsgR29sZiBSZXNvcnQgV2VpbWFyZXIgTGFuZCBvbiBKdWx5IDEzLCAyMDI0IGluIEJsYW5rZW5oYWluLCBHZXJtYW55LiAoUGhvdG8gYnkgUmljaGFyZCBQZWxoYW0vR2V0dHkgSW1hZ2VzKTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgo8cGx1czpMaWNlbnNvcj48cmRmOlNlcT48cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz48cGx1czpMaWNlbnNvclVSTD5odHRwczovL3d3dy5nZXR0eWltYWdlcy5jb20vZGV0YWlsLzIxNjE4NjM2MjU/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmw8L3BsdXM6TGljZW5zb3JVUkw+PC9yZGY6bGk+PC9yZGY6U2VxPjwvcGx1czpMaWNlbnNvcj4KCQk8L3JkZjpEZXNjcmlwdGlvbj4KCTwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InciPz4KAA=='
          alt='Upload Image'
        />
      </div>
      <div className='post__footer'>
        <div className='post__footerIcons'>
          <div className='post__iconsMain'>
            <FavoriteBorderIcon className='postIcon' />
            <ChatBubbleOutLineIcon className='postIcon' />
            <TelegramIcon className='postIcon' />
            <div className='post__iconsSave'>
              <BookmarkBorderIcon className='postIcon' />
            </div>
          </div>
        </div>
        Liked by 21 people
      </div>
    </div>
  )
}

export default Post
