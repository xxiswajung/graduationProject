import React,{useEffect, useState} from 'react';
import {getDatabase, ref, set,child,get } from "firebase/database";
import Todaylog from './Todaylog';
import moment from 'moment';
import firebase from "firebase/compat/app";

function Logadd({location}){
        const dbRef = ref(getDatabase());
        const [date, setdate] = useState({});
        const [tcaris, settcaris] = useState('')
        const [tprois, settprois] = useState('')
        const [tfatis, settfatis] = useState('')
        const [lognum,setlognum]=useState(0)
        const [getMoment, setMoment] = useState(moment())
        const today = getMoment
        const auth = getAuth();
        const user = auth.currentUser;

        let ss; var tmpcar; var tmppro; var tmpfat;
        


        // 각 끼니의 기록 식단 수 가져오기
        

        function writeUserData(fooddata,y,m,d,e,foodpro,foodcarbo,foodfat,foodtotal) { //음식기록
            const db = getDatabase();
          
            
            firebase.database().ref('flog/'+user.uid+'/'+y+'/'+m+'/'+d+'/'+e).push({
                name: fooddata,
                total: foodtotal,
                pro:foodpro,
                car:foodcarbo,
                fat:foodfat
            });


        }

     
                if(location.search){//Mapcontainer에서 데이터 넘길 때
                    var temp=location.search.split("?");
                    var data=temp[1].split("/");
                    var chatChannelId = decodeURI(data[0]);

                    writeUserData(chatChannelId,data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8]);
                }else if(location.state==null){//그냥 바로 페이지 클릭시
                
                
                    var data=[];
                    data=data.concat("");
                    data=data.concat(today.format('YY'));
                    data=data.concat(today.format('MM'));
                    data=data.concat(today.format('D'));
                //  console.log(today.getMonth());

                    

                }else if(location.state.ff==null){//calender에서 넘어올 때
                
                    var data=[];
                    data[1]=location.state.yy;
                    data[2]=location.state.mm;
                    data[3]=location.state.dd;
                

                }else{ //음식추가페이지
                
                
                    var data=[];
                    data=data.concat("");
                    data=data.concat(location.state.yy);
                    data=data.concat(location.state.mm);
                    data=data.concat(location.state.dd);
                    data=data.concat(location.state.ee);
                   
                
                    writeUserData(location.state.ff,data[1],data[2],data[3],data[4],location.state.spro,location.state.scarbo,location.state.sfat,location.state.stotal);
                
                
                }

            

        
        
    return(
        <Todaylog dd={data[3]} yy={data[1]} mm={data[2]}/>
    )
}

export default Logadd;
