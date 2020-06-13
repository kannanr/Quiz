import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "../context";

// export const AuthContext = React.createContext();

import Login from '../users/login'
import Register from '../users/register'
import Profile from '../users/profile'
import MyPractices from '../users/my_practices'
import Home from '../users/home'

import QuizCategories from '../quiz/categories'
import QuizDetail from '../quiz/details'
import QuizPractice from '../quiz/practice'
import QuizResult from '../quiz/result'

import AuthStackScreen from './auth_navigation'

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

export const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Exams" component={QuizCategories} />
    <HomeStack.Screen
      name="Details"
      component={QuizCategories}
      options={({ route }) => ({
        title: route.params.name
      })}
      headerMode="none"
      
    />
  </HomeStack.Navigator>
);

export const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const ProfileStack = createStackNavigator();
export const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

export const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Exams" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
export const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);