import React, { useState } from "react";
import { authService, firebaseInstance } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if (name==='email') {
      setEmail(value)
    } else if (name=== "password") {
      setPassword(value);
    }
  }
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch(error) {
      console.log(error)
    }
  }

  const onGoogleClick = async (event) => {
    const {target: {name}} = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
        <input type="submit" value={ newAccount ? "Create Account" : "Login" } />
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Login" : "Create Account"}</span>
      <button name="google" onClick={onGoogleClick}>구글 계정으로 로그인</button>
    </div>
  )
}

export default Login;
