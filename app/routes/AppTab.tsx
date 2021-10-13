import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeContainer from '../screens/Home/HomeContainer';
import modules from '../modules';
import { TabBar } from './TabBar';
import ProfileController from 'screens/Profile/ProfileController';

const TAB = createBottomTabNavigator()



const tabIcon = {
    EXPLORE: {
      label: 'Home',
      icon: 'home-5-line',
    },
    PROFILE: {
      label: 'Profile',
      icon: 'account-circle-line'
    }
}
  

export default function APP_TAB() {
    return (
        <TAB.Navigator
            tabBarOptions={{
                activeTintColor: modules.PRIMARY,
                inactiveTintColor: modules.PRIMARY_TAB
            }}
            tabBar={props => <TabBar tabData={tabIcon} {...props} />}>
            <TAB.Screen
                name="EXPLORE" component={HomeContainer} />
            <TAB.Screen
                name="PROFILE" component={ProfileController} />
        </TAB.Navigator>
    );
}