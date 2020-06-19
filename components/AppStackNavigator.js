import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import RecieverDetails from '../screens/RecieverDetails';
import BookDonateScreen from '../screens/BookDonateScreen';

export const AppStackNavigator = createStackNavigator({
    BookDonateList:{ screen : BookDonateScreen,
    navigationOptions: {
        headerShown: false
    }},

    ReceiverDetails:{ screen : RecieverDetails,
        navigationOptions: {
            headerShown: false
        }},
},
{
    initialRouteName : BookDonateList
}
)
