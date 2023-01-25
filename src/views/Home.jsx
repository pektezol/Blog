import React from 'react'

import BlogPost from '../components/BlogPost'

import list from '../posts.json'

function Home() {
  return (
    <div>
      {list.length && list.map((post, i) => {
        return (
          <div className="post" key={post.id}>
            <BlogPost
            title={post.title} 
            date={post.date} 
            author={post.author} 
            content={post.content} />
          </div>
        )
      })}
    </div>
  )
}

export default Home