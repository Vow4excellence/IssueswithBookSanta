import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {ListItem, Icon, Card} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class MyDonations extends React.Component{
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            allDonations :[],
            }
            this.requestRef = null
    }

    getAllDonations=()=> {
        this.requestRef = db.collection('all_Donations').where("donor_Id", '==', this.state.userId).onSnapshot((snapshot)=>{
            var allDonations = snapshot.docs.map(document => document.data());
            this.setState({
                allDonations : allDonations,
            })
        })
    }
    componentDidMount(){
        this.getAllDonations()
      }
   
      componentWillUnmount(){
        this.requestRef();
      }

      
    keyExtractor = (item,index) => index.toString()

    renderItem =({item, i})=>(
        <ListItem 
        key = {i}
        title= {item.book_name}
        subtitle  = {"Requested By " + item.requested_by + "\nStatus : " + item.request_status}
        leftElement = {<Icon name = "book"/>}
        titleStyle = {{color : 'white'}}
        rightElement = {
            <TouchableOpacity style = {styles.button}>
                <Text> send BOOK </Text>
            </TouchableOpacity>
        }
        bottomDivider
        />
    )


    render(){
        return(
            <View style = {{flex : 1}}>
                <MyHeader navigation = {this.props.navigation} title = "My Donations"/>
                <View style = {{flex : 1}}>
                    {
                        this.state.allDonations.length ===0
                        ?(
                            <View style = {styles.subtitle}>
                                <Text>No books donated</Text>
                                </View>
                        )
                        :(
                            <FlatList 
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.allDonations}
                            renderItem = {this.renderItem}
                            />
                        )
                    }
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
     
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })
  