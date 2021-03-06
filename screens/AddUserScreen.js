import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
import firebase from '../database/firebaseDb';

class AddUserScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('users');
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    
    this.state = {
      name: '',
      email: '',
      mobile: '',
      fechahora: date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec,
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.name === ''){
     alert('Te falto tu nombre es obligatorio!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        fechahora : this.state.fechahora,
      }).then((res) => {
        this.setState({
          name: '',
          email: '',
          mobile: '',
          isLoading: false,
          fechahora : '',
        });
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>
            Ejemplo CRUD Firebase
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Nombre'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Celular'}
              value={this.state.mobile}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Agrega usuario'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Ver usuarios'
            onPress={() =>  this.props.navigation.navigate('UserScreen')} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default AddUserScreen;