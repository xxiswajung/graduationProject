import React from 'react';
import AppShell from './AppShell';
import {HashRouter as Router,Route} from 'react-router-dom';
import huser from './pages/huser';
import Home from './pages/Home';
import userinfo from './userinfo';

class App extends React.Component{
      render(){
          return ( 
            <Router>

              <AppShell>
                <div> 
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/pages/huser" component={huser}/>
                  <Route exact path="/userinfo" component={userinfo}/>
                </div>
              </AppShell>
            </Router>
        );
      }
    
}

export default App;
