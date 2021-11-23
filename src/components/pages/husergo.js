import React, { Component, useEffect, useState} from "react";
import { Text } from 'react-native';
import styled from 'styled-components';
import Mainhome from './Mainhome';
import { BrowserRouter, Route,Link, Switch} from 'react-router-dom';
// const { getDatabase } = require('firebase-admin/database');
import { authService, firedatabase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import userEvent from "@testing-library/user-event";



const Form = styled.form`
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -50%);
      /* width: 100%;
      height: 100%; */
      margin: 0 auto;
      justify-content: center;
      align-content: center;
      display: inline-block;
      /*font-family: Noto Sans KR;*/
      font-size: 16px;
  `;
const List = styled.text`
      font-size: 16px;
      margin : 0 50px ;
      justify-content: center;
      align-content: center;
      line-height: 4;
`;
const InputR = styled.input`
     margin: 5px 10px;
     height: 20px;
     width: 20px;
   `;

const Button = styled.button`
    width: 150px;
    margin: 10px 80px;
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
  margin-left: 500px;
  margin-top:10px;
  margin-bottom: 10px;
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

const Recom = styled.div`
    margin: 10px 100px;
    justify-content: center;
    align-content: center;
`;

export default function HuserGo() {

  const db = firedatabase;
  const [usergen, setUsergen] = useState('');
  const [userage, setUserage] = useState('');
  const [userhei, setUserhei] = useState('');
  const [userwei, setUserwei] = useState('');
  const [userway, setUserway] = useState('');
  const [userara, setUserara] = useState('');
  const [userbra, setUserbra] = useState('');
  const [usercra, setUsercra] = useState('');
  const [time, setTime] = useState('');

  const callData = () => {
    const uid = authService.currentUser.uid;
    const rref = db.ref('user').orderByKey();
    rref.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.key == uid) {
          const key = childSnapshot.key;
          const childData = childSnapshot.val();
          setUsergen(childData.gender);
          setUserage(parseInt(childData.age)) ;
          setUserhei(parseInt(childData.height));
          setUserwei(parseInt(childData.weight));
          setUserway(childData.way);
          setUserara(parseInt(childData.aratio));
          setUserbra(parseInt(childData.bratio));
          setUsercra(parseInt(childData.cratio));
        }
      })
    })
  }
  
  callData();

  const onChange = (e) => {
    setTime(e.target.value)
  };

  const [recom, setRecom] = useState('');
  const [morning, setBrefast] = useState('');
  const [lunch, setLun] = useState('');
  const [dinner, setDinn] = useState('');
  const [meal, setMeal] = useState('');
  const [carbos, setCarbos] = useState('');
  const [carboe, setCarboe] = useState('');
  const [pros, setPros] = useState('');
  const [proe, setProe] = useState('');
  const [fats, setFats] = useState('');
  const [fate, setFate] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  function onShow() {
    if(usergen === 'male' && userway === 'usual'){
        setRecom(parseInt(662-9.53*userage+1.11*15.91*userwei+539.6*userhei/100))
    }
    else if(usergen === 'male' && userway === 'diet'){
        setRecom(parseInt((66.47+13.75*userwei+5*userhei-6.76*userage)*1.2))
    }
        
    else if(usergen === 'female' && userway === 'usual'){
        setRecom(parseInt(354-6.91*userage+1.12*9.36*userwei+726*userhei/100))
    }
    else if(usergen === 'female' && userway === 'diet'){
        setRecom(parseInt((655.1+9.56*userwei+1.85*userhei-4.68*userage)*1.2))
    }
  }
 

  function huserRecom(userId, recom){
    update(ref(db,'user/' + userId),{
      recom: recom
    });
  }

  function step1(callback){
    setTimeout(function(){
      if(time==="morning"){
        setMeal(parseInt(recom/(userara+userbra+usercra)*userara))
      }
      else if(time==="lunch"){
        setMeal(parseInt(recom/(userara+userbra+usercra)*userbra))
      }
      else if(time==="dinner"){
        setMeal(parseInt(recom/(userara+userbra+usercra)*usercra))
      }
      callback()
      console.log("meal은 "+meal)
      console.log("carboe는" +carboe);
    }, 500)
  }

  function step2(){
    setTimeout(function(){
      setCarboe(parseInt(meal*0.7/4))
      setCarbos(parseInt(meal*0.55/4))
      setProe(parseInt(meal*0.2/4))
      setPros(parseInt(meal*0.07/4))
      setFate(parseInt(meal*0.25/9))
      setFats(parseInt(meal*0.15/9))
    },1000)
  }

  // async function onChoose() {
  //   if(time==="breakfast"){
  //     setMeal(parseInt(recom/(userara+userbra+usercra)*userara))
  //   }
  //   else if(time==="lunch"){
  //     setMeal(parseInt(recom/(userara+userbra+usercra)*userbra))
  //   }
  //   else if(time==="dinner"){
  //     setMeal(parseInt(recom/(userara+userbra+usercra)*usercra))
  //   }
  // }

  // async function onTrans() {
  //     setCarboe(parseInt(meal*0.7/12))
  //     setCarbos(parseInt(meal*0.55/12))
  //     setProe(parseInt(meal*0.2/12))
  //     setPros(parseInt(meal*0.07/12))
  //     setFate(parseInt(meal*0.25/27))
  //     setFats(parseInt(meal*0.15/27))
  //     showMsg();

  //     function showMsg() {
  //       alert('지도에서 확인해보세요!');
  //     }
  // }

  // async function Together() {
  //   await onChoose();
  //   console.log('meal은 '+meal);
  //   await onTrans();
  //   console.log('carboe는 '+carboe)
  //   // onChoose().then(()=>onTrans().then());
  //   // console.log('meal '+meal);
  //   // console.log('carboe '+carboe)
  // } 

    return (
      <Form>
        <Text><b>{"\n"}</b></Text>
        {'🙌 이제 음식을 추천 받을 수 있어요! 🙌'}
        <Text><b>{"\n"}</b></Text>
        <Text><b>{"\n"}</b></Text>
        {'정보가 맞다면 결과 버튼을 눌러 추천 일일 칼로리를 확인 한 후 지도에서 확인을 누르고,'}
        <Text><b>{"\n"}</b></Text>
        {'정보를 수정하고 싶으면 정보 수정하기를 눌러주세요 :)'}
        <Text><b>{"\n"}</b></Text>
        <Text><b>{"\n"}</b></Text>
        <Link to="/huser">
          <Button2 type="button">정보 수정하기</Button2>
        </Link>
        <Text><b>{"\n"}</b></Text>
        <form style={{border:'1px solid gray', borderRadius:20}}>
        <Text><b>{"\n"}</b></Text>
        <List><b>{user.displayName}</b>님의 정보 ✍️</List>
        <Text><b>{"\n"}</b></Text>
        <List><b>성별</b></List> 
        {usergen === "male" ? "남성" : "여성"}
        <Text><b>{"\n"}</b></Text>
        <List><b>나이</b></List> 
        {userage}세
        <Text><b>{"\n"}</b></Text>
        <List><b>신장</b></List> 
        {userhei}cm
        <Text><b>{"\n"}</b></Text>
        <List><b>체중</b></List> 
        {userwei}kg
        <Text><b>{"\n"}</b></Text>
        <List><b>식단방법</b></List> 
        {userway === "usual" ? "일반식" : "다이어트식"}
        <Text><b>{"\n"}</b></Text>
        <List><b>식단비율</b></List> 
        <Text>아침   :   점심   :   저녁  =   </Text>
        <Text>{userara}   :    {userbra}   :    {usercra}</Text>
        <Text><b>{"\n"}</b></Text>
        <List><b>지금 먹을 건,</b></List> 
        <InputR
          id="breakfast"
          value="breakfast"
          name="time"
          type="radio"
          checked={time==="morning"}
          onChange={onChange}
        />
        아침
        <InputR
          id="lunch"
          value="lunch"
          name="time"
          type="radio"
          checked={time==="lunch"}
          onChange={onChange}
        />
        점심
        <InputR
          id="dinner"
          value="dinner"
          name="time"
          type="radio"
          checked={time==="dinner"}
          onChange={onChange}
        />
        저녁
        <Text>{"\n"}</Text>
        <Button type="button" onClick={onShow}> 칼로리 확인하기 </Button>
        {huserRecom(user.uid,recom)}
        <BrowserRouter> 
        <Route path='/mainhome' component={() => <Mainhome carbos={carbos} carboe={carboe} pros={pros} proe={proe} fats={fats} fate={fate} time={time}/> }/>
            <Button onClick={step1(step2)}> <Link to='/mainhome'> 지도에서 확인</Link></Button>
        </BrowserRouter>
        {/* <Button type="button" onClick={step1(step2)}> 
          <Link to={{pathname:'./mainhome', state:{carbos:carbos, carboe:carboe, pros:pros, proe:proe, fats:fats, fate:fate}}}>음식 추천받기</Link>
        </Button> */}
        {/* <Button type="button" onClick={step1(step2)}> 지도에서 확인 </Button>   */}
        <Text>{"\n"}</Text>
        <Recom><Text>We recommend you to try this daily intake calories!  </Text>
        <Text> <b> {recom} kcal </b> </Text></Recom>
        <Text>{"\n"}</Text>
        </form>
      </Form>
    );
  }



