import React from 'react';
import AppShell from './components/AppShell';
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import Huser from './components/pages/huser';
import MapContainer from './components/pages/MapContainer';
import Profile from './components/userinfo';
import Auth from './components/pages/SAuth';
import UserMain from './components/pages/UserMain';
import Home from './components/pages/Home';
import Mainhome from './components/pages/Mainhome';
import Calendar from './components/diary/Calendar';
import Logadd from './components/diary/Logadd';
import Searchfood from './components/diary/Searchfood';
import HuserGo from './components/pages/husergo';


const AppRouter = ({isLoggedIn}) => {
    return ( 
      <Router>
        <AppShell>
          <Switch> 
            {isLoggedIn ? (
              <>
                <Route exact path="/huser" component={Huser}/>
                <Route exact path="/husergo" component={HuserGo}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/main" component={UserMain}/>
                <Route exact path="/mainhome" component={Mainhome}/>
                <Route exact path="/calendar" component={Calendar}/>
                <Route exact path="/logadd" component={Logadd}/>
                <Route exact path="/searchfood" component={Searchfood}/>
                {/* <Redirect from="*" to="/huser" /> */}
              </> 
            ) : (
              <>
              <Route exact path="/" component={Auth}/>
              <Redirect from="*" to="/" />
              </>
              )}
          </Switch>
         </AppShell>
      </Router>
    );
};

export default AppRouter;