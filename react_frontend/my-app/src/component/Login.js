import React, { useEffect, useState } from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom"




const Login = () => {

    const [username, setUsername] = useState('')
  const [password, setPassword] = useState(' ')
  const [token, setToken] = useCookies(["my_token"])
  const [loginpage, setLoginPage ]= useState(true)

  // check cookie, if true, navigate to /articles directly
  const navigate = useNavigate()
  useEffect(() => {
    // console.log("token:" + token['my_token'])
    if (token['my_token'] != null) {
     navigate('/articles')
    }  
  },[token['my_token']])


    const loginBTN= () => {
        //  use APIService utility class
      APIService.loginUser({ username, password })
        // useCookies() to save token to 'my_token' in cookies in browser
        .then(res => {
          if (res.token) {
            setToken('my_token', res.token)
          } else {
            setUsername('')
            setPassword('')
          }           
          
        }
          )
        // .then(res => console.log(res.token))
        .catch(err => console.log(err))
  }
  
  const RegisterBTN = () => {
    APIService.registerUser({ username, password }).then(res => loginBTN()).catch(err=>console.log(err));
    
  }
    
  return (
    <div>
      <h1>Please {loginpage ? 'Log In :' : 'Register :' }</h1>
          <div>
              <label htmlFor="username">username:</label>
              <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div>
              <label htmlFor="password">password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {loginpage ? <button onClick={loginBTN}>Log In</button> : <button onClick={RegisterBTN}>Register</button>}
      
      <div>
        {loginpage ? <h5>If You don't have an account, <button onClick={() => setLoginPage(false)}>Register</button></h5> : <h5>If you already have an account please , <button onClick={() => setLoginPage(true)}>Login</button></h5>}
        
      </div>
    </div>
  )
}

export default Login
