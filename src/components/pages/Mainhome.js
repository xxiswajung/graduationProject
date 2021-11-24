import React from 'react';
import MapContainer from './MapContainer';
//import {HashRouter as Router,Route} from 'react-router-dom';
import { BrowserRouter, Route,Link } from 'react-router-dom';
//import React from 'react';
import { firestore } from '../../firebase';
//import axios from "axios";
import { useAsync } from 'react-async';



async function getUser({carbos,carboe,pros,proe,fats,fate}) {

    console.log("왜 안나타나"+carbos);
    const citiesRef = firestore.collection('menu');
    const query=await citiesRef.where('carbo','>=',carbos).get();//102/*).get();
    var itemlist=[];
    var Iteminfo = function(name, total,carbo,pro,fat)
    { this.name = name; // this는 자신이 속한 객체를 참조하는 '자기 참조 변수'다. 
      this.total=total;
      this.carbo=carbo;
      this.pro=pro;
      this.fat=fat;
    }
    var i=0;
    
    if (query.empty) {
    console.log('No matching documents.');
    return;
    }

    query.forEach(doc => {
    if(doc.data().carbo<=carboe&&doc.data().pro>=pros&&doc.data().pro<=proe&&doc.data().fat>=fats&&doc.data().fat<=fate){
            //console.log(doc.id, '=>', doc.data());
            var iteminfo=new Iteminfo(doc.data().name,doc.data().total,doc.data().carbo,doc.data().pro,doc.data().fat);
            
            console.log("뭐가 "+iteminfo);
            itemlist=itemlist.concat(/*<p key={i}>*{*/iteminfo/*}</p>*/);
            
            
    }
    });
    console.log(itemlist);
    return itemlist;
}


function Mainhome({location}) {
        
      
      const { data: users, error, isLoading } = useAsync({
        promiseFn: getUser,
        carbos : location.state.carbos,
        carboe : location.state.carboe,
        pros : location.state.pros,
        proe : location.state.proe,
        fats : location.state.fats,
        fate : location.state.fate,
        // watch: location.state.carbos
      });

      

        if (isLoading) return <div>로딩중..</div>;
        if (error) return <div>에러가 발생했습니다</div>;
        if (!users) return null;

        return(
            <div>
                
                <MapContainer answer={users} time={location.state.time}/>
           
            </div>
        )
    
}


export default Mainhome;