import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Use Feather icons
import HomeScreen from "../screens/HomeScreen";
import CheckCaloriesScreen from "../screens/CheckCaloriesScreen";
import CameraScreen from "../screens/CameraScreen";
import ReminderScreen from "../screens/ReminderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createStackNavigator } from '@react-navigation/stack';
import AddReminderScreen from "../screens/AddReminderScreen";  // Check this path
import ChatWithDurryScreen from '../screens/ChatWithDurryScreen';

import { getFocusedRouteNameFromRoute } from "@react-navigation/native"



const Tab = createBottomTabNavigator();
const ReminderStack = createStackNavigator();
const HomeStack = createStackNavigator();


function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ChatWithDurry" component={ChatWithDurryScreen} />
    </HomeStack.Navigator>
  );
}

function ReminderStackScreen() {
  return (
    <ReminderStack.Navigator screenOptions={{ headerShown: false }}>
      <ReminderStack.Screen name="ReminderMain" component={ReminderScreen} />
      <ReminderStack.Screen name="AddReminder" component={AddReminderScreen} />
    </ReminderStack.Navigator>
  );
}


// Custom Camera Button
const CameraButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#A780FF",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    }}
    onPress={onPress}
  >
    <Icon name="camera" size={28} color="#fff" />
  </TouchableOpacity>
);


export default function MainStackNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "Home"; 

        return {
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#A780FF",
          tabBarInactiveTintColor: "#C4C4C4",
          tabBarStyle: routeName === "ChatWithDurry" ? { display: "none" } : {
            height: 80,
            backgroundColor: "#fff",
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          },
        };
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={24} color={focused ? "#A780FF" : "#C4C4C4"} />
          ),
        }}
      />
      <Tab.Screen
        name="Reminder"
        component={ReminderStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="bell" size={24} color={focused ? "#A780FF" : "#C4C4C4"} />
          ),
        }}
      />
      <Tab.Screen
        name="Check Calories"
        component={CheckCaloriesScreen}
        options={{
          tabBarIcon: () => null,
          tabBarButton: (props) => <CameraButton {...props} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="image" size={24} color={focused ? "#A780FF" : "#C4C4C4"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="user" size={24} color={focused ? "#A780FF" : "#C4C4C4"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}