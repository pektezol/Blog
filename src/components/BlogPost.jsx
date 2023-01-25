import React from 'react'
import Markdown from 'react-markdown'

function BlogPost(props) {

  return (
    <div className="post">
      <h2 className="title">{props.title}</h2>
      <p className="date">{props.date}</p>
      <p className="author">{props.author}</p>
      <hr />
      <div className="content">
        <Markdown children={props.content}/>
      </div>
    </div>
  )
}

export default BlogPost