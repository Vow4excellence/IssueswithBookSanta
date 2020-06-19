import React from 'react';
import {Header} from 'react-native-elements';

const MyHheader = props =>{
    return(
        <Header
        centerComponent={{text:props.title, style : {color : '#ffffff', fontSize:20, fontWeight:'bold'}}}
        backgroundColor='#990000'/>    )
}

export default MyHheader;
