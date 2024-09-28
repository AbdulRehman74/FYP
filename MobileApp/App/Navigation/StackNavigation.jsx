import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Welcome from '../Screens/Welcome';
import Signup from '../Screens/Signup';
import Profile from '../Screens/Profile';
import Fav from '../Screens/Fav';
import Search from '../Screens/Search';
import Hamburger1 from '../Screens/Hamburger1';
import Aboutus from '../Screens/Aboutus';
import Community from '../Screens/Community';
import Privacy from '../Screens/Privacy';
import Contact from '../Screens/Contact';
import Terms from '../Screens/Terms';
import ChatList from "../Screens/ChatList";
import TaskForm from "../Screens/TaskForm";
import Chat from "../Screens/Chat";
import Chatbot from "../Screens/Chatbot";
import ChatBubble from "../Screens/ChatBubble";
import TaskDetail from "../Screens/TaskDetail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ViewTask from "../Screens/ViewTask";
import Registration from '../Screens/Registration';
import ProviderHome from '../Screens/ProviderHome';
import ProfileProvider from '../Screens/ProfileProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Text } from 'react-native';
import ReviewAnalyzer from "../Screens/ReviewAnalyzer";
import FavProvider from '../Screens/FavProvider';
import ViewTaskProvider from "../Screens/ViewTaskProvider";
import ViewOnMapScreen from "../Screens/ViewOnMapScreen";
import ViewAllProvidersOnMap from "../Screens/ViewAllProvidersOnMap";
import ChatListProvider from "../Screens/ChatListProvider";
import ChatProvider from "../Screens/ChatProvider";
import ViewCustomerLocationScreen from "../Screens/ViewCustomerLocationScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const CustomerTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#e91e63", tabBarInactiveTintColor: "green" }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        tabBarLabel: 'Home'
      }} />
      <Tab.Screen name="My Task" component={Fav} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />,
        tabBarLabel: 'My Tasks'
      }} />
      <Tab.Screen name="Post" component={TaskForm} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        tabBarLabel: 'Post'
      }} />
      <Tab.Screen name="Messages" component={Chatbot} options={{
        tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle" color={color} size={size} />,
        tabBarLabel: 'Chat'
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle" color={color} size={size} />,
        tabBarLabel: 'Me'
      }} />
    </Tab.Navigator>
  );
};

const ServiceProviderTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#e91e63", tabBarInactiveTintColor: "gray" }}>
      <Tab.Screen name="ProviderHome" component={ProviderHome} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        tabBarLabel: 'Dashboard'
      }} />
                 <Tab.Screen name="My Task" component={FavProvider} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />,
        tabBarLabel: 'My Tasks'
      }} />
            <Tab.Screen name="Messages" component={Chatbot} options={{
        tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle" color={color} size={size} />,
        tabBarLabel: 'Chat'
      }} />
            <Tab.Screen name="Profile" component={ProfileProvider} options={{
        tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle" color={color} size={size} />,
        tabBarLabel: 'Me'
      }} />
      
 
      {/* Additional provider-specific tabs can be defined here */}
    </Tab.Navigator>
  );
};



const Stacknavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          headerShown: false
        }
      }
    >
    
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="ServiceProviderTabs" component={ServiceProviderTabs} /> 
      <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
      <Stack.Screen name="Aboutus" component={Aboutus} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Hamburger1" component={Hamburger1} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      {/* <Stack.Screen name="Chat" component={Chat} /> */}

      {/* <Stack.Screen name="ChatList" component={ChatList} /> */}
      <Stack.Screen name="TaskForm" component={TaskForm} />
      <Stack.Screen name="ViewTask" component={ViewTask} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Chatbot" component={Chatbot} />
      <Stack.Screen name="ChatBubble" component={ChatBubble} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ProfileProvider" component={ProfileProvider} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="ProviderHome" component={ProviderHome} />
      <Stack.Screen name="ReviewAnalyzer" component={ReviewAnalyzer} />
      <Stack.Screen name="ViewTaskProvider" component={ViewTaskProvider} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewOnMapScreen" component={ViewOnMapScreen} />
      <Stack.Screen name="ViewAllProvidersOnMap" component={ViewAllProvidersOnMap} />
      <Stack.Screen name="ChatListProvider" component={ChatListProvider} />
      <Stack.Screen name="ChatProvider" component={ChatProvider} />
      <Stack.Screen name="ViewCustomerLocationScreen" component={ViewCustomerLocationScreen} />
    </Stack.Navigator>
  )
}

export default Stacknavigation

