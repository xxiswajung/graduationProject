import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

var firebase = require('firebase/app');
require('firebase/database');

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = { data: [] }
  }
  componentDidMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyC_tX6fyka3FAVo4VaPWVgXspTeaPS-X8c",
      authDomain: "practice1-1fb4d.firebaseapp.com",
      databaseURL: "https://practice1-1fb4d-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "practice1-1fb4d",
      storageBucket: "practice1-1fb4d.appspot.com",
      messagingSenderId: "217466085326",
      appId: "1:217466085326:web:6d4ec22ce64c4a859d159f",
      measurementId: "G-T4LKPJVC4L"
    });
    
    const ref = firebase.database().ref();

    ref.on("value", snapshot => {
      this.setState({ data: snapshot.val()});
    });
  }

  render(){
    return(
      <View style={styles.container}>
        {
          this.state.data.map(value => {
            return (
              <View>
                <Text>{value.name}</Text>
              </View>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'Center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
