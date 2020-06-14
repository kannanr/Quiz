
import React from "react";
import { AuthContext } from '../context'
import { ScreenContainer } from '../screen_container'
import { Text, Button } from 'react-native-elements'
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
