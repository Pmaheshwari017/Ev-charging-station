import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import Profiles from '../Screen/Profiles/Profiles';
import AntDesign from '@expo/vector-icons/AntDesign'
import { Ionicons } from '@expo/vector-icons';
import Favorites from '../Screen/Favorites/Favorites';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../utilities/Color';
const buttomTab = createBottomTabNavigator();

const TabNavigdation = () => {
    console.log("r")
    return (
        <buttomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
        }}>
            <buttomTab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: "Search",
                    tabBarActiveTintColor: Colors.PRIMARY,
                    tabBarInactiveTintColor: 'gray',
                    // tabBarActiveBackgroundColor: Colors.PRIMARY,
                    tabBarIcon: ({ color, size }) => (
                        // <AntDesign name="search1" size={24} color="black" />
                        <Ionicons name="search" size={size} color={color} />
                    )
                }}
            />
            <buttomTab.Screen name="Favorite" component={Favorites} options={{
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="heart-outline" size={size} color={color} />
                )
            }} />
            <buttomTab.Screen name="Profile" component={Profiles} options={{
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="user" size={size} color={color} />
                )
            }} />
        </buttomTab.Navigator>
    )
}

export default TabNavigdation

const styles = StyleSheet.create({})