import { firestore, authService } from '../firebase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Huser from './pages/huser';

const Profile = () =>{
      const history = useHistory();
      const auth = getAuth();
      const user = auth.currentUser;
      
      if ( user !== null){
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;
      }

      const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
      };

      return (
          <button onClick={onLogOutClick}>
            Log Out
          </button>
      );
    };



export default Profile;
