import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import animatedReactNative from '../images/react-native-black500px.gif'
const window = Dimensions.get('window');

// export default Loading = props => {
//   return (<View><Text>LOADING</Text></View>)
// }

export default Loading = (props) => { 
  return (
    !props.isReady ? 
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }} >
      <FastImage
        style={{ width: window.width, height: window.height }}
        source={animatedReactNative}
        resizeMode={FastImage.resizeMode.contain}
        />
    </View> : null
  )
}

const styles = StyleSheet.create({
  someStyle: {
    fontSize: 20,
    backgroundColor: 'red',
  }
})