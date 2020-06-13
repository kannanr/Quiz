import React from 'react'
import { Text, Button } from 'react-native-elements'
import { ScreenContainer } from '../screen_container'
import { AuthContext } from '../context'

export default Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};