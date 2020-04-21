import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'


import HomeScreen from '../screens/HomeScreen'

const AppNavigator= createStackNavigator({
    Home:{
        screen:HomeScreen,
        navigationOptions:{
            headerShown: false,
        },
    },
})

export default Router= createAppContainer(AppNavigator)