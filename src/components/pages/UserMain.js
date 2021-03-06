import {Image, StyleSheet} from 'react-native';
import { Link } from "react-router-dom";
import React from 'react';
import styled from 'styled-components';
import { getAuth } from "firebase/auth";
import { authService } from '../../firebase';
import food from "../../images/healthy_food.png";
import { useHistory } from 'react-router-dom';

const Div = styled.div`
    position: absolute;
    /*width: 100%;
    height: 100%;*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    justify-content: center;
    align-content: center;
    display: inline-block;
  `;
  
const Logo = styled.img`
    /* position: absolute; */
    width: 200px;
    height: 200px;
    display: block;
    margin: 30px auto;
    /*top: 30%;
    left: 42%;*/
`;

const Par = styled.div`
    /*position: absolute;
    justify-content: center;
    align-items: center;
    top: 60%;
    left: 35%;*/
    margin: 10px 0;
    text-align: center;
`;

const Menu = styled.div`
   /* position: absolute;
    top: 85%;
    left: 37%;*/
    margin: 20px 0;
    text-align: center;
`;

const UserMain = () => {
    const history = useHistory();
    const auth = getAuth();
    const user = auth.currentUser;

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
      };


    return(
        <Div>
            <Logo src={food}/>
            <br/>
            <Par>
            <h1 className="title" >
                {'π μλνμΈμ,'}{' '}{ user.displayName }{'λ!'}
                <br />
            </h1>
            
            <p className="subtitle">
                {"Healthy Peopleμ μ΄μ©ν΄ κ°μ΄ λ κ±΄κ°ν μΆμ λ§λ€μ΄ λ³΄μμ!π"} 
                <br />
                {"μλμ λ©λ΄λ₯Ό λλ¬ μλΉμ€λ₯Ό μ΄μ©ν΄μ£ΌμΈμ:)"}
            </p>
            </Par>
            <Menu>
                <Link to="/huser">{"βοΈλ΄ μ λ³΄ μλ ₯νκΈ°"}</Link>
                {"    |    "}
                <Link to="/husergo">{"π₯μμ μΆμ² λ°κΈ°"}</Link>
                {"    |    "}
                <Link to="/home">{"πμ£Όλ³μμ μμ κ²μνκΈ°"}</Link>
                {"    |    "}
                <Link to="/calendar">{"πμλ¨ νμΈνκΈ°"}</Link>
                {"    |    "}
                <Link to="/" onClick={onLogOutClick}>{"ππββοΈλ‘κ·Έμμ"}</Link>
            </Menu>
        </Div>  
    );
  }
  
  export default UserMain;