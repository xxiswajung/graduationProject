import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Chart from './Chart';
import styled from 'styled-components';

const List = styled.div`    
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: #323232;
  letter-spacing: -3px;
`; 

const Button = styled.button`
    width: 60px;
    margin-left: 900px;
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
  width: 80px;
  float: right;
  margin: 10px 0;
  border: 1px solid seagreen;
  background-color: rgba(0,0,0,0);
  color: seagreen;
  border-radius: 5px;
  &:hover{
    color: white;
    background-color: seagreen;
  }
`;

const Set = styled.div`
  top:50%;
`;

function Todaylog({dd,yy,mm}){

            const dbRef = ref(getDatabase());
            const auth = getAuth();
            const user = auth.currentUser;

            const [Mfoodis, setMfoodis] = useState([])
            const [Mfoodcis, setMfoodcis] = useState(0)
            const [Mfoodpis, setMfoodpis] = useState(0)
            const [Mfoodfis, setMfoodfis] = useState(0)
            const [Mfoodtis, setMfoodtis] = useState(0)
            const [Lfoodis, setLfoodis] = useState([])
            const [Lfoodcis, setLfoodcis] = useState(0)
            const [Lfoodpis, setLfoodpis] = useState(0)
            const [Lfoodfis, setLfoodfis] = useState(0)
            const [Lfoodtis, setLfoodtis] = useState(0)
            const [Dfoodis, setDfoodis] = useState([])
            const [Dfoodcis, setDfoodcis] = useState(0)
            const [Dfoodpis, setDfoodpis] = useState(0)
            const [Dfoodfis, setDfoodfis] = useState(0)
            const [Dfoodtis, setDfoodtis] = useState(0)
            const [tkcalis, settkcalis] = useState('')
            

            function dataremove(yy,mm,dd,meal,data){ //데이터 삭제 함수

                firebase.database().ref('flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/'+meal+'/'+data).remove()
                alert("삭제되었습니다!");
               window.location.reload(); //새로고침
            }
           
            useEffect(()=>{
                   
                //아침 식단 가져오기

                firebase.database().ref('flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/morning').on('value', (snapshot) => {


                    var i;var tmpcar=0; var tmppro=0; var tmpfat=0;

                    for(i=0;i<Object.values(snapshot.val()).length;i++){

                        console.log("key is is",Object.keys(snapshot.val())[i]);
                        var keyis=Object.keys(snapshot.val())[i];
                        var name=Object.values(snapshot.val())[i].name;
                        var car=Object.values(snapshot.val())[i].car;
                        var pro=Object.values(snapshot.val())[i].pro;
                        var fat=Object.values(snapshot.val())[i].fat;
                        var total=Object.values(snapshot.val())[i].total;
                        const tmpfoodis={kis:keyis, is:name,tis:total,cis:car,pis:pro,fis:fat}
                        tmpcar=tmpcar+car;tmppro+=pro;tmpfat+=fat;
                        setMfoodis(Mfoodis=> [...Mfoodis,tmpfoodis])
                        
                    }
                    setMfoodcis(Mfoodcis+tmpcar);
                    setMfoodpis(Mfoodpis+tmppro);
                    setMfoodfis(Mfoodfis+tmpfat);
                   
                });
                

                
                //점심 식단 가져오기


                firebase.database().ref('flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/lunch').on('value', (snapshot) => {


                    var i;var tmpcar=0; var tmppro=0; var tmpfat=0;

                    for(i=0;i<Object.values(snapshot.val()).length;i++){


                        var keyis=Object.keys(snapshot.val())[i];
                        var name=Object.values(snapshot.val())[i].name;
                        var car=Object.values(snapshot.val())[i].car;
                        var pro=Object.values(snapshot.val())[i].pro;
                        var fat=Object.values(snapshot.val())[i].fat;
                        var total=Object.values(snapshot.val())[i].total;
                        const tmpfoodis={kis:keyis,is:name,tis:total,cis:car,pis:pro,fis:fat}
                      
                        tmpcar=tmpcar+car;tmppro+=pro;tmpfat+=fat;
                        setLfoodis(Lfoodis=> [...Lfoodis,tmpfoodis])
                        
                    }
                    setLfoodcis(Lfoodcis+tmpcar);
                    setLfoodpis(Lfoodpis+tmppro);
                    setLfoodfis(Lfoodfis+tmpfat);
                    

                });


                //저녁 식단 가져오기
                
                firebase.database().ref('flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/dinner').on('value', (snapshot) => {


                    var i;var tmpcar=0; var tmppro=0; var tmpfat=0;

                    for(i=0;i<Object.values(snapshot.val()).length;i++){


                        var keyis=Object.keys(snapshot.val())[i];
                        var name=Object.values(snapshot.val())[i].name;
                        var car=Object.values(snapshot.val())[i].car;
                        var pro=Object.values(snapshot.val())[i].pro;
                        var fat=Object.values(snapshot.val())[i].fat;
                        var total=Object.values(snapshot.val())[i].total;
                        const tmpfoodis={kis:keyis,is:name,tis:total,cis:car,pis:pro,fis:fat}
                      
                        tmpcar=tmpcar+car;tmppro+=pro;tmpfat+=fat;
                        setDfoodis(Dfoodis=> [...Dfoodis,tmpfoodis])
                        
                    }
                    setDfoodcis(Dfoodcis+tmpcar);
                    setDfoodpis(Dfoodpis+tmppro);
                    setDfoodfis(Dfoodfis+tmpfat);
                    

                });

                //사용자의 총칼로리 가져오기
                get(child(dbRef, 'user/'+user.uid)).then((snapshot) => { //nowuser-> 사용자 id로 바꾸기 
                    console.log("now user is "+ nowuser);
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
            const showMfoodlist = Mfoodis.map(data=>{ //아침 식단 출력
                return(
                 
                <div>
                  <ul>
                    <li>
                                        <p>{data.is}<button onClick={()=>dataremove(yy,mm,dd,'morning',data.kis)}>삭제</button></p>
                                        <span> 총열량: {data.tis}</span>
                                        <span> 탄수화물: {data.cis}</span>
                                        <span> 단백질: {data.pis}</span>
                                        <span> 지방: {data.fis}</span>
                                        
                    </li>
                   
                  </ul>
                </div>
                )
                
            })

            const showLfoodlist = Lfoodis.map(data=>{ //점심 식단 출력
                return(
                 
                <div>
                  <ul>
                    <li>
                                        <p>{data.is}<button onClick={()=>dataremove(yy,mm,dd,'lunch',data.kis)}>삭제</button></p>
                                        <span> 총열량: {data.tis}</span>
                                        <span> 탄수화물: {data.cis}</span>
                                        <span> 단백질: {data.pis}</span>
                                        <span> 지방: {data.fis}</span>
                    </li>
                   
                  </ul>
                </div>
                )
                
            })

            const showDfoodlist = Dfoodis.map(data=>{ //저녁식단 출력
                return(
                 
                <div>
                  <ul>
                    <li>
                                        <p>{data.is}<button onClick={()=>dataremove(yy,mm,dd,'dinner',data.kis)}>삭제</button></p>
                                        <span> 총열량: {data.tis}</span>
                                        <span> 탄수화물: {data.cis}</span>
                                        <span> 단백질: {data.pis}</span>
                                        <span> 지방: {data.fis}</span>
                    </li>
                   
                  </ul>
                </div>
                )
                
            })

        
             //탄단지 (아+점+저) 섭취량 && 그램수(g)->kcal 변환
            var carper=(parseFloat(Mfoodcis)+parseFloat(Lfoodcis)+parseFloat(Dfoodcis))*4;
            var proper=(parseFloat(Mfoodpis)+parseFloat(Lfoodpis)+parseFloat(Dfoodpis))*4;
            var fatper=(parseFloat(Mfoodfis)+parseFloat(Lfoodfis)+parseFloat(Dfoodfis))*9;

           
            //비율계산
            carper=(carper/(parseFloat(tkcalis)*0.65))*100;
            proper=(proper/(parseFloat(tkcalis)*0.15))*100;
            fatper=(fatper/(parseFloat(tkcalis)*0.2))*100;

            return (
                <div>
                    <Typography align="center" variant="h5"> 20{yy}년 {mm}월 {dd}일  </Typography>
                   <Button><Link to ="/calendar">달력</Link></Button>
                   <Grid container spacing={4}>
                        <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                    <List>아침</List>
                                    <Button2><Link to={ {pathname:'./searchfood', state:{meal:"morning", yy:yy, dd:dd, mm:mm }}}>음식추가</Link></Button2>
                                    <p>{showMfoodlist}</p>
                                    
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>점심</List>
                                <Button2><Link to={ {pathname:'./searchfood', state:{meal:"lunch", yy:yy, dd:dd, mm:mm}}}>음식추가</Link></Button2>
                                <p>{showLfoodlist}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>저녁</List>
                                <Button2><Link to={ {pathname:'./searchfood', state:{meal:"dinner", yy:yy, dd:dd, mm:mm}}}>음식추가</Link></Button2>
                                <p>{showDfoodlist}</p>
                            </CardContent>
                        </Card>
                        
                        </Grid>
                        <Grid item xs={6}>
                        <Set>
                        <svg viewBox="0 -10 100 200" width="30%" height="40%">
                            <Chart per={carper} nut={"탄수화물"} nutcolor={"#9ac6ff"}/>
                            <p>탄수화물</p>
                        </svg>
                        <svg viewBox="0 -10 100 200" width="30%" height="40%">
                            <Chart per={proper} nut={"단백질"} nutcolor={"#9ac6ff"}/>
                        </svg>
                        <svg viewBox="0 -10 100 200" width="30%" height="40%">
                            <Chart per={fatper} nut={"지방"} nutcolor={"#9ac6ff"}/>
                        </svg>
                           </Set>                     
                        </Grid>

                    </Grid>
                        
                
                </div>
                
            )
       
}


export default Todaylog;


/*

<span> 총열량: {Mfoodtis}</span>
                                            <span> 탄수화물: {Mfoodcis}</span>
                                            <span> 단백질: {Mfoodpis}</span>
                                            <span> 지방: {Mfoodfis}</span>
                                            */



//   const history=useHistory();
/*
function bringfinfo(foodname){
    const food = firestore.collection('menu');
    const snapshot= food.where('name','==',foodname).get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    
    snapshot.then((docs)=>{
        docs.forEach((doc)=>{
            if(doc.exists){
                console.log(doc.data());
                console.log(doc.id);
            }
        });
    });
}*/



/*
 <span> 총열량: {Lfoodtis}</span>
                                            <span> 탄수화물: {Lfoodcis}</span>
                                            <span> 단백질: {Lfoodpis}</span>
                                            <span> 지방: {Lfoodfis}</span>

                                            <span> 총열량: {Dfoodtis}</span>
                                            <span> 탄수화물: {Dfoodcis}</span>
                                            <span> 단백질: {Dfoodpis}</span>
                                            <span> 지방: {Dfoodfis}</span>
                                            */



//<Showb ct={0.67} cc={0.59} cf={0.99} cp={0.33}/>

//`user1/21/11/15/아침`
/*
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Buttonnext from './Buttonnext';
import { withRouter } from 'react-router-dom';
import { BrowserRouter, Route,Link,Switch } from 'react-router-dom';
import { button } from 'react-router-dom';
//import Searchmenu from './Searchmenu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/Textfield';
import Showfood from './Showfood';
import Showbar from './Showbar';
import Showb from './Showb';
*/

/* 검색창 넘기기
<div onClick={() => {props.history.push("/diary/Menuinfoa")}}>
                                    
                                    <p> CLICK</p>
                                </div>
                                
                                */

//<Typography variant="h5" component="h2"> {props.location.state.year}년 {props.location.state.month}월 {props.location.state.date}일</Typography>
//<Typography variant="h5" component="h2"> {props.location.state.year}년 {props.location.state.month}월 {props.location.state.date}일</Typography>

//<button onClick={() => {props.history.push('/diary/Searchmenu')}}>add</button>

/*
<Grid conatainer>
                            <Grid item xs={1}>
                                <Typography variant="h5" component="h2">
                                    아침
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                            
                                <div onClick={gotosearch}>
                                    <h1> CLICK</h1>
                                </div>
                                
                            </Grid>
                        </Grid>
                        */
                                    