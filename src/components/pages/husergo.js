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
      console.log("meal??? "+meal)
      console.log("carboe???" +carboe);
    }, 50)
  }

  function step2(){
    setTimeout(function(){
      setCarboe(parseInt(meal*0.7/4))
      setCarbos(parseInt(meal*0.55/4))
      setProe(parseInt(meal*0.2/4))
      setPros(parseInt(meal*0.07/4))
      setFate(parseInt(meal*0.25/9))
      setFats(parseInt(meal*0.15/9))
    },100)
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
  //       alert('???????????? ??????????????????!');
  //     }
  // }

  // async function Together() {
  //   await onChoose();
  //   console.log('meal??? '+meal);
  //   await onTrans();
  //   console.log('carboe??? '+carboe)
  //   // onChoose().then(()=>onTrans().then());
  //   // console.log('meal '+meal);
  //   // console.log('carboe '+carboe)
  // } 

    return (
      <Form>
        <Text><b>{"\n"}</b></Text>
        {'???? ?????? ????????? ?????? ?????? ??? ?????????! ????'}
        <Text><b>{"\n"}</b></Text>
        <Text><b>{"\n"}</b></Text>
        {'????????? ????????? ?????? ????????? ?????? ?????? ?????? ???????????? ?????? ??? ??? ???????????? ????????? ?????????,'}
        <Text><b>{"\n"}</b></Text>
        {'????????? ???????????? ????????? ?????? ??????????????? ??????????????? :)'}
        <Text><b>{"\n"}</b></Text>
        <Text><b>{"\n"}</b></Text>
        <Link to="/huser">
          <Button2 type="button">?????? ????????????</Button2>
        </Link>
        <Text><b>{"\n"}</b></Text>
        <form style={{border:'1px solid gray', borderRadius:20}}>
        <Text><b>{"\n"}</b></Text>
        <List><b>{user.displayName}</b>?????? ?????? ??????</List>
        <Text><b>{"\n"}</b></Text>
        <List><b>??????</b></List> 
        {usergen === "male" ? "??????" : "??????"}
        <Text><b>{"\n"}</b></Text>
        <List><b>??????</b></List> 
        {userage}???
        <Text><b>{"\n"}</b></Text>
        <List><b>??????</b></List> 
        {userhei}cm
        <Text><b>{"\n"}</b></Text>
        <List><b>??????</b></List> 
        {userwei}kg
        <Text><b>{"\n"}</b></Text>
        <List><b>????????????</b></List> 
        {userway === "usual" ? "?????????" : "???????????????"}
        <Text><b>{"\n"}</b></Text>
        <List><b>????????????</b></List> 
        <Text>??????   :   ??????   :   ??????  =   </Text>
        <Text>{userara}   :    {userbra}   :    {usercra}</Text>
        <Text><b>{"\n"}</b></Text>
        <List><b>?????? ?????? ???,</b></List> 
        <InputR
          id="morning"
          value="morning"
          name="time"
          type="radio"
          checked={time==="morning"}
          onChange={onChange}
        />
        ??????
        <InputR
          id="lunch"
          value="lunch"
          name="time"
          type="radio"
          checked={time==="lunch"}
          onChange={onChange}
        />
        ??????
        <InputR
          id="dinner"
          value="dinner"
          name="time"
          type="radio"
          checked={time==="dinner"}
          onChange={onChange}
        />
        ??????
        <Text>{"\n"}</Text>
        <Button type="button" onClick={onShow}> ????????? ???????????? </Button>
        {huserRecom(user.uid,recom)}
        {step1(step2)}
        <Button> <Link to={{
          pathname: '/mainhome',
          state: {
            carbos: carbos,
            carboe: carboe,
            pros: pros,
            proe: proe,
            fats: fats, 
            fate: fate,
            time: time
          }
        }}>???????????? ??????</Link></Button>
        <Text>{"\n"}</Text>
        <Recom><Text>We recommend you to try this daily intake calories!  </Text>
        <Text> <b> {recom} kcal </b> </Text></Recom>
        <Text>{"\n"}</Text>
        </form>
      </Form>
    );
  }



