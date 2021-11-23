import React, { Component, useState } from "react";
import { Text } from 'react-native';
import styled from 'styled-components';
import Mainhome from './Mainhome';
import { BrowserRouter, Route,Link, Switch} from 'react-router-dom';
// const { getDatabase } = require('firebase-admin/database');
import { authService, firedatabase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router";


const Form = styled.form`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /* width: 100%;
      height: 100%; */
      margin: 0 50px;
      justify-content: center;
      align-content: center;
      display: inline-block;
      /*font-family: 'Noto Sans KR';*/
      font-size: 15px;
  `;
const Input = styled.input`
      width: 200px;
      height: 20px;
      margin: 50px 0;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 3px solid gray;
      text-align: right;
  `;
const InputR = styled.input`
     margin: 5px 20px;
     height: 20px;
     width: 40px;
   `;

const InputS = styled.input`
   margin: 5px 20px;
   height: 20px;
   width: 40px;
   border-top: none;
   border-left: none;
   border-right: none;
   border-bottom: 3px solid gray;
 `;

const Button = styled.button`
    width: 100px;
    margin: 30px 70px;
    justify-content: center;
    align-content: center;
    border: 1px solid seagreen;
    background-color: rgba(0,0,0,0);
    color: seagreen;
    border-radius: 5px;
    &:hover{
      color: white;
      background-color: seagreen;
    }
  `;

  const Button2 = styled.button`
  width: 100px;
  margin-left: 100px;
  justify-content: center;
  align-content: center;
  border: 1px solid seagreen;
  background-color: rgba(0,0,0,0);
  color: seagreen;
  border-radius: 5px;
  &:hover{
    color: white;
    background-color: seagreen;
}
`;

export default function Huser() {

  const db = firedatabase;

  const [inputs, setInputs] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    way: '',
    aratio: '',
    bratio: '',
    cratio: '',
  });

  const { gender, age, height, weight, way, aratio, bratio, cratio } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  function onShow (){
    const auth = getAuth();
    const user = auth.currentUser;

    showMsg();
    huserData(user.uid,gender,age,height,weight,way,aratio,bratio,cratio);

    function showMsg() {
        alert('저장 완료!');
    }
    function huserData(userId, gender, age, height, weight, way, aratio, bratio, cratio) {
      set(ref(db,'user/' + userId),{
        gender: gender,
        age: age,
        height: height,
        weight: weight,
        way: way,
        aratio: aratio,
        bratio: bratio,
        cratio: cratio
      });
    }
    
  }
     
   return (
      <Form>
        {'이 페이지는 개인 정보를 수정하는 곳 입니다. 정보를 입력 한 뒤, 저장 버튼을 꼭 눌러주세요! :)'}
        <Text><b>{"\n"}</b></Text>
        <Text><b>{"\n"}</b></Text>
        <Text><b>{"\n"}</b></Text>
        <form>
        <Text><b>성별  </b></Text> 
        <InputR
          id="male"
          value ="male"
          name="gender"
          type="radio"
          checked={gender==="male"}
          onChange={onChange}
        />
        남성
        <InputR
          id="female"
          value= "female"
          name="gender"
          type="radio"
          checked={gender==="female"}
          onChange={onChange}
        />
        여성
        <Text><b>{"\n"}나이  </b></Text> 
        <Input value={age}
          onChange={onChange}
          name="age"
        />세
        <Text><b>{"\n"}신장  </b></Text> 
        <Input 
          value={height}
          onChange={onChange}
          name="height"
        />cm
        <Text><b>{"\n"}체중  </b></Text> 
        <Input
          value={weight}
          onChange={onChange}
          name="weight"
        />kg
        <Text><b>{"\n"}식단방법  </b></Text> 
        <InputR
          id="usual"
          value="usual"
          name="way"
          type="radio"
          checked={way === "usual"}
          onChange={onChange}
        />
        일반식
        <InputR
          id="diet"
          value="diet"
          name="way"
          type="radio"
          checked={way === "diet"}
          onChange={onChange}
        />
        다이어트식
        <Text>{"\n"}</Text>
        <Text><b>{"\n"}식단비율  </b></Text> 
        아침
        <InputS
          value={aratio}
          onChange={onChange}
          name="aratio"
        />
        점심
        <InputS
          value={bratio}
          onChange={onChange}
          name="bratio"
        />
        저녁
        <InputS
          value={cratio}
          onChange={onChange}
          name="cratio"
        />
        <Text>{"\n"}</Text>
        <Button type="button" onClick={onShow}> 저장 </Button>
        <Link to="/husergo">
          <Button2 type="button">음식 추천받기</Button2>
        </Link>
        </form>
      </Form>
    );
  }



