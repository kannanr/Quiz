import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Picker from 'react-native-picker-select';
const screenWidth = Dimensions.get('window').width;

export default PickerComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text style={ styles.label }>{props.label}</Text>
      <Picker
        value={props.selectedValue}
        placeholder={{
          label: props.placeholder,
          value: null,
          color: '#9EA0A4',
        }}
        onValueChange={(itemValue, itemIndex) =>
          props.onChange(itemValue)
        }
        items={props.availableOptions.map((option) => { return { label: option, value: option } })}
        // InputAccessoryView={() => null}
        style={pickerSelectStyles}
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
  label: {
    fontWeight: "700",
    fontSize: 16,
    width: screenWidth*0.2
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'black',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    paddingRight: 30
  },
  inputAndroid: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30
  },
});