import React, { useEffect, useState } from 'react'

const Form = (props) => {
  const [title, setTitle] = useState(props.article.title)
  const [description, setDescription] = useState(props.article.description)

  useEffect(() => {
    setTitle(props.article.title);
    setDescription(props.article.description);

  }, [props.article])
  
  return (
      <div>
      {props.article &&
        
        (
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder={props.article.title} value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <label htmlFor="description">Description</label>
          <textarea name="" id="" cols="30" rows="10" placeholder={props.article.description} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          {props.article.id ? (<button onClick={() => props.newdata(title, description)}>update article</button>) : (
            <button onClick={() => props.insertdata(title, description)}>insert new article</button>
          )}

          
        </div>
      )
      }
    </div>
  )
}

export default Form;
