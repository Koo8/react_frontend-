
import React, { useEffect, useState } from 'react'
import './App.css';
import ArticleList from './component/ArticleList';
import Form from './component/form';
import APIService from '../src/APIService'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'


function App() {

  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token, setToken, removeToken] = useCookies(["my_token"])

  const navigate = useNavigate()

  // get variable of the article from the articlelist, and pass it to form
  function updateBTN(article) {
    setEditArticle(article)
  }


  // get variables from form.py 
  const updateArticle = (title, description) => {
    // fetch from CRUD Class
    APIService.updateArticle(editArticle.id, { title, description }, token['my_token']).then(res => setArticles(articles.map(article => { return (res.id === article.id) ? res : article })));

    setEditArticle(null);
  }

  
  function deleteBTN(article) {
    APIService.removeArticle(article, token['my_token']);
    const new_list = articles.filter(a => a.id !== article.id)
    setArticles(new_list)
  }
 
   

  const addBTN = () => {
    setEditArticle({ title: '', description: '' })
  }

  const insertArticle = (title, description) => {
    APIService.addArticle({ title, description}, token['my_token'])
      .then(res => setArticles([...articles, res])).catch(err => console.log(err))
  
    setEditArticle(null)
  }

  const loginBTN = () => {
    navigate('/')
  }

  const logoutBTN = () => {
    removeToken('my_token', { path: '/' })
    navigate('/')
  }
  
  
  
  useEffect(() => {
    //  method 1:  since django backend use DRF's permission of "isauthorizedorreadonly", so the token is not required
    // console.log(token)
    try {
      APIService.showList(token['my_token'])
        .then(res => setArticles(res))
        .catch(err => console.log(err))
    } 
    catch (error){
      setArticles([])

    } 

  }, [])

    return (
      <div className='app'>
        <h1>Django and React Blog</h1>
        <button onClick={addBTN}>add new article</button> 
        <button onClick={logoutBTN}>Logout</button>
        {articles.length > 0 ?
        <ArticleList items={articles} updateArticle={updateBTN} deleteArticle={deleteBTN} />
           : <><h5>Please log in first</h5><button onClick={loginBTN}>Log in</button></>} 
        
        {editArticle && <Form article={editArticle} newdata={updateArticle} insertdata={insertArticle } />}

      </div>
    
    )
  }
export default App;
