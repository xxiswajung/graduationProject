import React from 'react';
import Mainhome from './Mainhome';
import { BrowserRouter, Route,Link } from 'react-router-dom';

function Tmp() {

    

      return (
        <div>
        <BrowserRouter>
                
                
                <Route path="/Mainhome" component={() => <Mainhome carbos={102} carboe={121.71} pros={18.7} proe={37.45} fats={12.48} fate={20.8}/> }/>
                <ul>
                    <button> <Link to='/Mainhome'> 지도</Link></button>
                </ul>
        </BrowserRouter>

          
              
         
          </div>
      )
  
}

export default Tmp;
