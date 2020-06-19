import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default TextField = (props) => {
  var textValue = props.value;
  return (
    <View style={styles.container}>
      <Text style={ styles.label }>{props.label}</Text>
      <TextInput
        autoCorrect={false}
        placeholder={props.placeholder}
        blurOnSubmit={false}
        returnKeyType={"next"}
        style={styles.textInput}
        onBlur={(e) => {
          props.value = e.nativeEvent.text;
          props.onChange(e);
        }} 
        defaultValue={textValue}
        onSubmitEditing={() => { props.nextFocus.focus() }}
        ref={props.reference}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1, 
    borderBottomColor: 'gray',
    fontSize: 14, 
    alignItems: 'flex-start', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
  },
  textInput: {
    paddingLeft: 20,
    color: 'black',
    fontSize: 14,
    height: 50,
    flex: 1
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
  },
});