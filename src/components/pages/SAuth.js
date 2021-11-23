import React from "react";
import { authService, firebaseInstance } from "../../firebase";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import styled from 'styled-components';
import Welcome from "./Welcome";

const Div = styled.div`
    position: absolute;
    top: 50%;
    right:0%;
    transform: translate(-50%, -50%);
  `;
const Login = styled.h2`
    text-align : center;
    font-size:20px;
    color: gray;
`;
  const Button = styled.button`
  width:300px;
  height: 40px;
  top: 40%;
  right :50%;
  border: 1px solid seagreen;
  background-color: rgba(0,0,0,0);
  color: seagreen;
  border-radius: 5px;
  &:hover{
    color: white;
    background-color: seagreen;
  }
`;

const Auth = ({currentUser}) => {
  const history = useHistory();
  const firebase = useFirebase();
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    firebaseInstance.auth().setPersistence(firebaseInstance.auth.Auth.Persistence.SESSION)
    const data = await authService.signInWithPopup(provider);
    console.log(data);
    history.push("/main");
  };

  return (
    currentUser ?
    <div className="option" onClick={() => authService.signOut()}>SIGN OUT</div>
  :
  <div>
    <Welcome /><Div>
      <div>
        <Login>{"Login Here 👇"}</Login>
        <Button onClick={onSocialClick} name="google">
          Continue with Google
        </Button>
      </div>
    </Div>
  </div>
    
  );

};

export default Auth;