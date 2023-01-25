import React from 'react'

import BlogPost from '../components/BlogPost'

import { useParams } from 'react-router-dom'

import list from '../posts.json'
import NotFound from './NotFound'

function Post() {
  const params = useParams()
  let postObject = {}
  list.length && list.map((post, i) => {
    if (post.id === params.postID) {
      postObject = post
    }
  })
  if (JSON.stringify(postObject) === '{}') {
    return (
      <NotFound />
    )
  }
  return (
    <div>
      <div className="post" key={postObject.id}>
        <BlogPost
        title={postObject.title} 
        date={postObject.date} 
        author={postObject.author} 
        content={postObject.content} />
      </div>
    </div>
  )
}

export default Post