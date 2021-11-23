import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Chart from './Chart';
import styled from 'styled-components';

const Typo = styled.div`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /* width: 100%;
      height: 100%; */
      margin: 0 auto;
      justify-content: center;
      align-content: center;
      /*display: inline-block;*/
      /* text-align: left; */
      font-family: 'Noto Sans KR';
      font-size: 12px;
  `;

const List = styled.div`
  width: 600px;
  height: 100px;
  margin: 50px 0;
`; 

const Button = styled.button`
    width: 60px;
    float: right;
    // margin: 10px 0;
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
  width: 80px;
  float: right;
  // margin: 10px 0;
  border: 1px solid seagreen;
  background-color: rgba(0,0,0,0);
  color: seagreen;
  border-radius: 5px;
  &:hover{
    color: white;
    background-color: seagreen;
  }
`;

function Todaylog({dd,yy,mm}){

    const dbRef = ref(getDatabase());
    const auth = getAuth();
    const user = auth.currentUser;

    const [Mfoodis, setMfoodis] = useState('')
    const [Mfoodcis, setMfoodcis] = useState('')
    const [Mfoodpis, setMfoodpis] = useState('')
    const [Mfoodfis, setMfoodfis] = useState('')
    const [Mfoodtis, setMfoodtis] = useState('')
    const [Lfoodis, setLfoodis] = useState('')
    const [Lfoodcis, setLfoodcis] = useState('')
    const [Lfoodpis, setLfoodpis] = useState('')
    const [Lfoodfis, setLfoodfis] = useState('')
    const [Lfoodtis, setLfoodtis] = useState('')
    const [Dfoodis, setDfoodis] = useState('')
    const [Dfoodcis, setDfoodcis] = useState('')
    const [Dfoodpis, setDfoodpis] = useState('')
    const [Dfoodfis, setDfoodfis] = useState('')
    const [Dfoodtis, setDfoodtis] = useState('')
    const [tkcalis, settkcalis] = useState('')
    

    useEffect(()=>{
           
        //아침 식단 가져오기
        get(child(dbRef, 'flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/morning/foodis')).then((snapshot) => { //user1-> 사용자 id로 바꾸기
            if (snapshot.exists()) {
                
                setMfoodis(snapshot.val().name)
                setMfoodtis(snapshot.val().total)
                setMfoodcis(snapshot.val().car)
                setMfoodpis(snapshot.val().pro)
                setMfoodfis(snapshot.val().fat)
            } else {
                console.log("No data available");
            
            }
            }).catch((error) => {
            console.error(error);
        });

        //점심 식단 가져오기
        get(child(dbRef, 'flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/lunch/foodis')).then((snapshot) => { //user1-> 사용자 id로 바꾸기
                if (snapshot.exists()) {
                    setLfoodis(snapshot.val().name)
                    setLfoodtis(snapshot.val().total)
                    setLfoodcis(snapshot.val().car)
                    setLfoodpis(snapshot.val().pro)
                    setLfoodfis(snapshot.val().fat)
                } else {
                    console.log("No data available");
                }
                }).catch((error) => {
                console.error(error);
        });

        //저녁 식단 가져오기
        get(child(dbRef, 'flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/dinner/foodis')).then((snapshot) => { //user1-> 사용자 id로 바꾸기
                    if (snapshot.exists()) {
                        setDfoodis(snapshot.val().name)
                        setDfoodtis(snapshot.val().total)
                        setDfoodcis(snapshot.val().car)
                        setDfoodpis(snapshot.val().pro)
                        setDfoodfis(snapshot.val().fat)
                    } else {
                        console.log("No data available");
                    }
                    }).catch((error) => {
                    console.error(error);
        });

        //사용자의 총칼로리 가져오기
        get(child(dbRef, 'user/'+user.uid)).then((snapshot) => { //user.uid-> 사용자 id로 바꾸기 
            console.log("now user is "+ user.uid);
            if (snapshot.exists()) {
                settkcalis(snapshot.val().recom)
                console.log("type is "+ typeof(tkcalis)+" tkcalis is"+parseFloat(tkcalis));
               
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
        });

          
            
    }, [])
            
    //탄단지 (아+점+저) 섭취량 && 그램수(g)->kcal 변환
    var carper=(Mfoodcis+Lfoodcis+Dfoodcis)*4;
    var proper=(Mfoodpis+Lfoodpis+Dfoodpis)*4;
    var fatper=(Mfoodfis+Lfoodfis+Dfoodfis)*9;

    //비율계산
    carper=(carper/(parseFloat(tkcalis)*0.65))*100;
    proper=(proper/(parseFloat(tkcalis)*0.15))*100;
    fatper=(fatper/(parseFloat(tkcalis)*0.2))*100;

    return (
        <div>
                   <Typography variant="h5" component="h2"> 20{yy}년 {mm}월 {dd}일</Typography>
                   <Link to='./calendar'>
                                    <button> 달력 </button>
                    </Link>
                   <Grid container spacing={3}>
        
                        <Grid item xs={6}>
                        <Card>
                            <CardContent>
            
                                <Typography variant="h5" component="h2">
                                    아침 
                                    
                                </Typography>
                                    <p>{Mfoodis}</p>
                                    <span> 총열량: {Mfoodtis}</span>
                                    <span> 탄수화물: {Mfoodcis}</span>
                                    <span> 단백질: {Mfoodpis}</span>
                                    <span> 지방: {Mfoodfis}</span>
                               
                                        <ul>
                                            <button><Link to={ {pathname:'./searchfood', state:{meal:"morning", yy:yy, dd:dd, mm:mm }}}>음식추가</Link></button>
                                        </ul>
                               
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                점심
                                <p>{Lfoodis}</p>
                                <span> 총열량: {Lfoodtis}</span>
                                <span> 탄수화물: {Lfoodcis}</span>
                                <span> 단백질: {Lfoodpis}</span>
                                <span> 지방: {Lfoodfis}</span>
                                   
                                        <ul>
                                            <button><Link to={ {pathname:'./searchfood', state:{meal:"lunch", yy:yy, dd:dd, mm:mm}}}>음식추가</Link></button>
                                        </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                저녁
                                <p>{Dfoodis}</p>
                                <span> 총열량: {Dfoodtis}</span>
                                <span> 탄수화물: {Dfoodcis}</span>
                                <span> 단백질: {Dfoodpis}</span>
                                <span> 지방: {Dfoodfis}</span>
                                    
                                        <ul>
                                            <button><Link to={ {pathname:'./searchfood', state:{meal:"dinner", yy:yy, dd:dd, mm:mm}}}>음식추가</Link></button>
                                        </ul>
                            </CardContent>
                        </Card>
                        
                        </Grid>
                        <Grid item xs={6}>
                          
                        <svg viewBox="0 0 100 100" width="30%" height="50%">
                            <Chart per={carper} nut={"탄수화물"} nutcolor={"#9ac6ff"}/>
                            <p>탄수화물</p>
                        </svg>
                        <svg viewBox="0 0 100 100" width="30%" height="50%">
                            <Chart per={proper} nut={"단백질"} nutcolor={"#9ac6ff"}/>
                        </svg>
                        <svg viewBox="0 0 100 100" width="30%" height="50%">
                            <Chart per={fatper} nut={"지방"} nutcolor={"#9ac6ff"}/>
                        </svg>
                                                
                        </Grid>
                    </Grid>
                
        
        </div>
        
    )

}


export default Todaylog;