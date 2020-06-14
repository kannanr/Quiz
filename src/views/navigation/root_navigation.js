import React from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, DrawerItems} from "@react-navigation/drawer";
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native'
// import { AuthContext } from "../context";

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
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { AuthContext } from '../context'

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
// const SearchStack = createStackNavigator();

const HeaderLeftIcon = ({ navigation }) => {
  return (<Icon
    name="menu"
    size={30}
    type="entypo"
    iconStyle={{ paddingLeft: 10 }}
    onPress={() => { navigation.navigation.toggleDrawer() }}
  />)
};

const headerLeft = navigation => (
  { headerLeft: () => <HeaderLeftIcon navigation={navigation} /> }
)

export const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Exams" component={QuizCategories} options={headerLeft} />
      <HomeStack.Screen
        name="Details"
        component={QuizCategories}
        options={({ route }) => ({
          title: route.params.name
        })}
        headerMode="none"
      />
    </HomeStack.Navigator>
  )
};

const ProfileStack = createStackNavigator();
export const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} options={{...headerLeft, headerShown: false}} headerMode="none" />
  </ProfileStack.Navigator>
);

export const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="All Exams" component={HomeStackScreen} />
    <Tabs.Screen name="My Exams" component={HomeStackScreen} />
    <Tabs.Screen name="Results" component={HomeStackScreen} />
  </Tabs.Navigator>
);

function CustomDrawerContent(props) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <DrawerContentScrollView {...props}>
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <DrawerItem label="Logout" onPress={() => signOut()} />
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home" headerMode="none" drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} headerMode="none" />
    <Drawer.Screen name="Settings" component={ProfileStackScreen} headerMode="none" />
    <Drawer.Screen name="Preferences" component={ProfileStackScreen} headerMode="none" />
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

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  }
});