import React from "react";
// import { ScreenContainer } from '../screen_container'
import { Text, Button } from 'react-native-elements'
const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export default Register = () => {
  const { signUp } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </ScreenContainer>
  );
};