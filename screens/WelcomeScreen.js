import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId : '',
            password:'',
            confirmPassword:'',
            firstName:'',
            lastName:'',
            contact:'',
            address:'',
            isModalVisible:false
        }
    }


    showModal=()=>{
return(
    <Modal 
    animationType= "fade"
    transparent = {true}
    visible = {this.state.isModalVisible}
    >
<View style = {styles.modalContainer}>
<ScrollView style = {{width:'100%'}}>
    <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>

        <Text style = {styles.modalTitle}>Registration</Text>

<TextInput style = {styles.formTextInput}
placeholder = {'First name'}
maxLength = {15}
onChangeText = {(text)=> {this.setState({firstName:text})}}
/>

<TextInput style = {styles.formTextInput}
placeholder = {'Last name'}
maxLength = {15}
onChangeText = {(text)=> {this.setState({lastName:text})}}
/>

<TextInput style = {styles.formTextInput}
placeholder = {'contact'}
maxLength = {10}
keyboardType = {"numeric"}
onChangeText = {(text)=> {this.setState({contact:text})}}
/>

<TextInput style = {styles.formTextInput}
placeholder = {'Address'}
multiline = {true}

onChangeText = {(text)=> {this.setState({address:text})}}
/>

<TextInput style = {styles.formTextInput}
placeholder = {'email'}
keyboardType = {"email-address"}
onChangeText = {(text)=> {this.setState({emailId:text})}}
/>

<TextInput style = {styles.formTextInput}
placeholder = {'password'}
secureTextEntry = {true}
onChangeText = {(text)=> {this.setState({password:text})}}
/>

<TextInput style = {styles.formTextInput}
placeholder = {'confirm password'}
secureTextEntry = {true}
onChangeText = {(text)=> {this.setState({confirmPassword:text})}}
/>

        <View style = {styles.modalBackButton}>

            <TouchableOpacity style = {styles.registerButton}
            onPress={()=>this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}>
                <Text style = {styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
        </View>

        <View style = {styles.modalBackButton}>
            <TouchableOpacity style = {styles.cancelButton}
            onPress={()=>this.setState({'isModalVisible' : false})}>
                <Text style={styles.cancelText}> CANCEL</Text>
            </TouchableOpacity>
            </View>

            </KeyboardAvoidingView>
        </ScrollView>
        </View>
    </Modal>
)}


    userLogin = (emailId, password)=>{
        
    firebase.auth().signInWithEmailAndPassword(emailId, password).then(()=>{
    //return Alert.alert("user logged in successfully");
    this.props.navigation.navigate("DonateBooks")
    })
.catch(function(error){
    //handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;
    return Alert.alert(errorMessage);
    })
}



    userSignUp=(emailId, password, confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert("password do not match")
        }
        
        else{ 
    firebase.auth().createUserWithEmailAndPassword(emailId, password).then((response)=>{
    return Alert.alert("user added successfully",
    '',
    [
      {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
    ]
    );

    })
.catch(function(error){
    //handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;
    return Alert.alert(errorMessage);
    });
    db.collection('users').add({
        first_name:this.state.firstName,
        last_name : this.state.lastName,
        Contact : this.state.contact,
        address : this.state.address,
    email_id :this.state.emailId
    })
    }
}



    render(){
        return(
            <View style = {styles.container}>
                <View style ={{justifyContent:'center', alignItems:'center'}}>
                    {this.showModal()}
                </View>
                
<TextInput style={styles.loginBox}
placeholder='email'
keyboardType='email-address'
onChangeText={(text)=>{
    this.setState({emailId : text})
}}
/>

<TextInput style={styles.loginBox}
placeholder='password'
secureTextEntry={true}
onChangeText={(text)=>{
    this.setState({password : text})
}}
/>

<TouchableOpacity style = {styles.loginButton}
onPress={()=>{this.userLogin(this.state.emailId, this.state.password)}}>
    <Text style = {styles.buttonText}> LOGIN</Text>
</TouchableOpacity>

<TouchableOpacity style = {styles.loginButton}
onPress={()=>this.setState({'isModalVisible':true})}>
    <Text style = {styles.buttonText}> SignUp</Text>
</TouchableOpacity>

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
    loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#ffffff',
        fontSize: 20,
        margin:10,
        paddingLeft:10
    },
    loginButton:{
        width:100,
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
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#0707AC",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff57ff',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#000010",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
        backgroundColor:'#888800'
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
