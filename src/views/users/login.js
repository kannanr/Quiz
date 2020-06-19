
import React from "react";
import { AuthContext } from '../context'
import { ScreenContainer } from '../screen_container'
import { Alert, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'
import TouchID from 'react-native-touch-id'

export default Login = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const optionalConfigObject = {
    title: "Authentication Required", // Android
    color: "#e00606", // Android,
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
  }

  const pressHandler = () => {
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        Alert.alert(
          "Authentication",
          "Authenticated Successfully",
          [ { text: "OK", onPress: () => console.log("OK Pressed") } ],
          { cancelable: true }
        );
        signIn();
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <ScreenContainer>
      <Text>Sign In</Text>
      <Button style={styles.button} title="Bio" onPress={() => pressHandler()} />
      <Button style={styles.button} title="Sign In" onPress={() => signIn()} />
      <Button style={styles.button} 
        title="Create Account"
        onPress={() => navigation.push("CreateAccount")}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5
  }
})