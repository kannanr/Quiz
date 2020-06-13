import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Login from '../users/login'
import Register from '../users/register'
const AuthStack = createStackNavigator();


export default AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={Login}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={Register}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);