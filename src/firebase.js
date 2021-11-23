import firebase from "firebase/compat/app" ;
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database' ;

const firebaseConfig = {
  apiKey: "AIzaSyC_tX6fyka3FAVo4VaPWVgXspTeaPS-X8c",
  authDomain: "practice1-1fb4d.firebaseapp.com",
  databaseURL: "https://practice1-1fb4d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "practice1-1fb4d",
  storageBucket: "practice1-1fb4d.appspot.com",
  messagingSenderId: "217466085326",
  appId: "1:217466085326:web:6d4ec22ce64c4a859d159f",
  measurementId: "G-T4LKPJVC4L"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// 필요한 곳에서 사용할 수 있도록 내보내기
export const firestore = firebase.firestore();
export const firedatabase = firebase.database();
export const firebaseInstance = firebase;
export const authService = firebase.auth();
