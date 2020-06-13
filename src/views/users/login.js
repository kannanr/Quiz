
import React from "react";
import { AuthContext } from '../context'
import { ScreenContainer } from '../screen_container'
import { Text, Button } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'

// const ScreenContainer = ({ children }) => (
//   <View style={styles.container}>{children}</View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginVertical: 10,
//     borderRadius: 5
//   }
// });

export default Login = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Sign In Screen</Text>
      <Button title="Sign In" onPress={() => signIn()} />
      <Button
        title="Create Account"
        onPress={() => navigation.push("CreateAccount")}
      />
    </ScreenContainer>
  );
};
