import React from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, DrawerItems} from "@react-navigation/drawer";
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native'

import Login from '../users/login'
import Register from '../users/register'
import Profile from '../users/profile'
import MyPractices from '../users/my_practices'
import Home from '../users/home'

import QuizCategories from '../quiz/categories'
// import QuizDetail from '../quiz/details'
import QuizPractice from '../quiz/practice'
// import QuizResult from '../quiz/result'

import AuthStackScreen from './auth_navigation'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { AuthContext } from '../context'

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();

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

export const TabsScreen = () => (
  <Tabs.Navigator name="HomeTab" initialRouteName="All Exams" 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'All Exams') {
          iconName = focused ? 'certificate' : 'certificate';
        } else if (route.name === 'My Exams') {
          iconName = focused ? 'account-clock' : 'account-clock-outline';
        } else if (route.name === 'Results') {
          iconName = 'bullseye-arrow'
        }

        // You can return any component that you like here!
        // return <Ionicons name={iconName} size={size} color={color} />;
        return <Icon name={iconName}
          size={30}
          type="material-community"
          iconStyle={{ marginTop: 5, color: (focused ? 'tomato' : 'gray') }}
          // onPress={() => { navigation.navigation.toggleDrawer() }}
        />
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tabs.Screen name="All Exams" component={QuizCategories} />
    <Tabs.Screen name="My Exams" component={MyPractices} />
    <Tabs.Screen name="Results" component={QuizCategories} />
  </Tabs.Navigator>
);

export const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen name="Home" component={TabsScreen} headerMode="none" options={headerLeft}/>
      <HomeStack.Screen name="Practice" component={QuizPractice} options={{headerShown: false, gestureEnabled: false}} />
    </HomeStack.Navigator>
  )
};

const ProfileStack = createStackNavigator();
export const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} options={headerLeft} />
  </ProfileStack.Navigator>
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
    <Drawer.Screen name="Exams" component={HomeStackScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    <Drawer.Screen name="Settings" component={ProfileStackScreen} />
    <Drawer.Screen name="Preferences" component={ProfileStackScreen} />
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