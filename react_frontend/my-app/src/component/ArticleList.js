


const ArticleList = (props) => {
    
  return (
    <div className='article-list'>
          {props.items && props.items.map(a => {
            return (
                <div key={a.id}>
                <li>{a.title}</li>
                <p>{a.description}</p>
                <button onClick={()=>props.updateArticle(a)}>update</button>
                <button onClick={() =>props.deleteArticle(a)}>delete</button>
                <hr />
                </div>
              )
          }             
      )}
      
    </div>
  )
}

export default ArticleList
