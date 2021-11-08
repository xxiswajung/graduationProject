import React from 'react';
import MapContainer from './MapContainer';
//import {HashRouter as Router,Route} from 'react-router-dom';
import { BrowserRouter, Route,Link } from 'react-router-dom';
//import React from 'react';
import { firestore } from '../../firebase';
import axios from "axios";
import { useAsync } from 'react-async';



async function getUser({carbos,carboe,pros,proe,fats,fate}) {

    console.log("왜 안나타나"+carbos);
    const citiesRef = firestore.collection('menu');
    const query=await citiesRef.where('carbo','>=',carbos).get();//102/*).get();
    var itemlist=[];
    var i=0;
    
    if (query.empty) {
    console.log('No matching documents.');
    return;
    }

    query.forEach(doc => {
    if(doc.data().carbo<=carboe&&doc.data().pro>=pros&&doc.data().pro<=proe&&doc.data().fat>=fats&&doc.data().fat<=fate){
            //console.log(doc.id, '=>', doc.data());
            itemlist.push(/*<p key={i}>*{*/doc.data().name/*}</p>*/);
            
    }
    });
//console.log(itemlist);
    return itemlist;
}


function Mainhome({carbos,carboe,pros,proe,fats,fate}) {
        
      const { data: user, error, isLoading } = useAsync({
        promiseFn: getUser,
        carbos,
        carboe,
        pros,
        proe,
        fats,
        fate,
        watch: carbos
      });

     console.log(user);

        if (isLoading) return <div>로딩중..</div>;
        if (error) return <div>에러가 발생했습니다</div>;
        if (!user) return null;

        return (

            <div>
                <MapContainer answer={user}/>
           
            </div>
        )
    
}
