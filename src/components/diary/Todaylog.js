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
           
        //?????? ?????? ????????????
        get(child(dbRef, 'flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/morning/foodis')).then((snapshot) => { //user1-> ????????? id??? ?????????
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

        //?????? ?????? ????????????
        get(child(dbRef, 'flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/lunch/foodis')).then((snapshot) => { //user1-> ????????? id??? ?????????
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

        //?????? ?????? ????????????
        get(child(dbRef, 'flog/'+user.uid+'/'+yy+'/'+mm+'/'+dd+'/dinner/foodis')).then((snapshot) => { //user1-> ????????? id??? ?????????
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

        //???????????? ???????????? ????????????
        get(child(dbRef, 'user/'+user.uid)).then((snapshot) => { //user.uid-> ????????? id??? ????????? 
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
            
    //????????? (???+???+???) ????????? && ?????????(g)->kcal ??????
    var carper=(Mfoodcis+Lfoodcis+Dfoodcis)*4;
    var proper=(Mfoodpis+Lfoodpis+Dfoodpis)*4;
    var fatper=(Mfoodfis+Lfoodfis+Dfoodfis)*9;

    //????????????
    carper=(carper/(parseFloat(tkcalis)*0.65))*100;
    proper=(proper/(parseFloat(tkcalis)*0.15))*100;
    fatper=(fatper/(parseFloat(tkcalis)*0.2))*100;

    return (
        <div>
                   <Typography align="center" variant="h5"> 20{yy}??? {mm}??? {dd}???  </Typography>
                   <Button><Link to ="/calendar">??????</Link></Button>
                   <Grid container spacing={4}>
                        <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                    <List>??????</List>
                                    <Button2><Link to={ {pathname:'./searchfood', state:{meal:"morning", yy:yy, dd:dd, mm:mm }}}>????????????</Link></Button2>
                                    <p>{Mfoodis}</p>
                                    <span> ?????????: {Mfoodtis} kcal</span>
                                    <span> ????????????: {Mfoodcis} g</span>
                                    <span> ?????????: {Mfoodpis} g</span>
                                    <span> ??????: {Mfoodfis} g</span>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>??????</List>
                                <Button2><Link to={ {pathname:'./searchfood', state:{meal:"lunch", yy:yy, dd:dd, mm:mm}}}>????????????</Link></Button2>
                                <p>{Lfoodis}</p>
                                <span> ?????????: {Lfoodtis} kcal</span>
                                <span> ????????????: {Lfoodcis} g</span>
                                <span> ?????????: {Lfoodpis} g</span>
                                <span> ??????: {Lfoodfis} g</span>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>??????</List>
                                <Button2><Link to={ {pathname:'./searchfood', state:{meal:"dinner", yy:yy, dd:dd, mm:mm}}}>????????????</Link></Button2>
                                <p>{Dfoodis}</p>
                                <span> ?????????: {Dfoodtis} kcal</span>
                                <span> ????????????: {Dfoodcis} g</span>
                                <span> ?????????: {Dfoodpis} g</span>
                                <span> ??????: {Dfoodfis} g</span>
                            </CardContent>
                        </Card>
                        
                        </Grid>
                        <Grid item xs={6}>
                        <Set>
                        <svg viewBox="0 -10 100 200" width="30%" height="40%">
                            <Chart per={carper} nut={"????????????"} nutcolor={"#9ac6ff"}/>
                            <p>????????????</p>
                        </svg>
                        <svg viewBox="0 -10 100 200" width="30%" height="40%">
                            <Chart per={proper} nut={"?????????"} nutcolor={"#9ac6ff"}/>
                        </svg>
                        <svg viewBox="0 -10 100 200" width="30%" height="40%">
                            <Chart per={fatper} nut={"??????"} nutcolor={"#9ac6ff"}/>
                        </svg>
                           </Set>                     
                        </Grid>

                    </Grid>
                
        
        </div>
        
    )

}


export default Todaylog;