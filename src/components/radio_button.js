import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'

export default RadioButton = (props) => {
  var borderColor = backgroundColor = textColor = '#000';
  if(props.selected && props.isCorrectAnswer != undefined) {
    borderColor = props.isCorrectAnswer ? 'green' : 'red'
    backgroundColor = props.isCorrectAnswer ? 'green' : 'red'
    textColor = props.isCorrectAnswer ? 'green' : 'red'
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 10, height: 40 }}
          onStartShouldSetResponder={() => {return true}}
          onResponderRelease={() => props.onPress ? props.onPress(props.value, props.question, props.answer) : null }
    > 
      <View style={[ { marginRight: 10, height: 32, width: 32, borderRadius: 16, borderWidth: 2, borderColor: borderColor, alignItems: 'center', justifyContent: 'center', }, props.style]} >
        {
          props.selected ?
            <View style={{ height: 16, width: 16, borderRadius: 8, backgroundColor: backgroundColor, }} />
            : null
        }
      </View>
      <Text style={{ fontSize: 12, color: textColor }}>{props.value}</Text>
    </View>
  );
}