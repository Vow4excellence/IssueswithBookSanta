import React from 'react';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import customSideBarMenu from './customSideBarMenu';
import ChangeProfile from '../screens/ChangeProfile';
import MyDonations from '../screens/MyDonations';


export const AppDrawerNavigator = createDrawerNavigator({
    Home : {screen : AppTabNavigator},
    ProfileChange : {screen : ChangeProfile},
    MyDonations : {screen : MyDonations}
},

{
    contentComponent : customSideBarMenu
},
{
    initialRouteName : 'Home'
}
)