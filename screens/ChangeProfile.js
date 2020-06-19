import React from 'react';
import {View, Text,TextInput,TouchableOpacity, KeyboardAvoidingView, StyleSheet, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ChangeProfile extends React.Component{

    constructor(){
        super();
        this.state={
            firstName:'',
            lastName:'',
            contact:'',
            address:'',
           emailId:'',
           docId:''
        }
    }

    getUserDetails(){
       // var users = firebase.auth().currentUser;
        //var email = users.email;
         //Alert.alert("name " +  email)

         var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id', '==', email).get().then(snapshot => {
            snapshot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                   firstName: data.first_name,
                   lastName : data.last_name,
                   contact : data.Contact,
                   address : data.address,
                   emailId: data.email_Id,
                   docId : doc.id
                })
               
            })
        })
       
    }

    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId).update({
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            Contact : this.state.contact,
            address : this.state.address,
        })
        Alert.alert("PROFILE UPDATES SUCCESSFULLY")
    }

    componentDidMount(){
        this.getUserDetails();
    }

    render(){
        return(
            <View style ={styles.container}>
            <MyHeader title = "Update Profile" navigation = {this.props.navigation}/>
            <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                <TextInput style = {styles.formTextInput}
                placeholder = {'First name'}
                maxLength = {15}
                onChangeText = {(text)=> {this.setState({firstName:text})}}
                value = {this.state.firstName}
                />

                <TextInput style = {styles.formTextInput}
                placeholder = {'Last name'}
                maxLength = {15}
                onChangeText = {(text)=> {this.setState({lastName:text})}}
                value = {this.state.lastName}
                />

                <TextInput style = {styles.formTextInput}
                placeholder = {'contact'}
                maxLength = {10}
                keyboardType = {"numeric"}
                onChangeText = {(text)=> {this.setState({contact:text})}}
                value = {this.state.contact}

                />

                <TextInput style = {styles.formTextInput}
                placeholder = {'Address'}
                multiline = {true}
                onChangeText = {(text)=> {this.setState({address:text})}}
                value = {this.state.address}
                
                />
                <TouchableOpacity style = {styles.loginButton}
                onPress={()=>{this.updateUserDetails()}}>
                    <Text style = {styles.buttonText}> Update Profile </Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#10019a'
    },
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      loginButton:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#fff",
        marginTop:20,
        
    },
    buttonText:{
        color:'#0000ff',
        fontWeight:'200',
        fontSize:20,
        justifyContent:'center',
        alignItems:'center',
    },
      formTextInput:{
        width:200,
        height:35,
        alignSelf:'center',
        borderColor:'#77ab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
        backgroundColor:'#444488'
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30,
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold',
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
        borderRadius:4,
        borderColor:'#ffffff',
      },
      cancelText:{
          color:'#ffffff'
      }
    })