/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  // Text,
  StatusBar,
  FlatList,
  Image
} from 'react-native';



import { AuthContext } from "./src/views/context";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackScreen } from './src/views/navigation/root_navigation'
import { Host } from 'react-native-portalize'
import SplashScreen from 'react-native-splash-screen'
import Loading from './src/views/Loading'


const App: () => React$Node = () => {
  const [isReady, setIsReady] = useState(false);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsReady(false);
        setUserToken("asdf");
      },
      signUp: () => {
        setIsReady(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsReady(false);
        setUserToken(null);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
      setIsReady(true)
    }, 1000)
  })
  if (isReady == false) {
    return (
      <View style={{ backgroundColor: 'black', flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loading isReady={isReady} />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Host>
          <RootStackScreen userToken={userToken}/>
        </Host>
      </NavigationContainer>
    </AuthContext.Provider>
  );
  
};


export default App;
