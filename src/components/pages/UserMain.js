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
                {'👀 안녕하세요,'}{' '}{ user.displayName }{'님!'}
                <br />
            </h1>
            
            <p className="subtitle">
                {"Healthy People을 이용해 같이 더 건강한 삶을 만들어 보아요!🙌"} 
                <br />
                {"아래의 메뉴를 눌러 서비스를 이용해주세요:)"}
            </p>
            </Par>
            <Menu>
                <Link to="/huser">{"✒️내 정보 입력하기"}</Link>
                {"    |    "}
                <Link to="/husergo">{"🥗음식 추천 받기"}</Link>
                {"    |    "}
                <Link to="/home">{"🔍주변에서 음식 검색하기"}</Link>
                {"    |    "}
                <Link to="/calendar">{"📜식단 확인하기"}</Link>
                {"    |    "}
                <Link to="/" onClick={onLogOutClick}>{"🙋🙋‍♂️로그아웃"}</Link>
            </Menu>
        </Div>  
    );
  }
  
  export default UserMain;