import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

function RadioButton(props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 10 }}
          onStartShouldSetResponder={() => {return true}}
          onResponderRelease={() => props.onPress(props.value, props.question, props.answer) }
    >
      <View style={[ { marginRight: 10, height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: '#000', alignItems: 'center', justifyContent: 'center', }, props.style]} >
        {
          props.selected ?
            <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: '#000', }} />
            : null
        }
      </View>
      <Text style={{ fontSize: 12 }}>{props.value}</Text>
    </View>
  );
}

export default QuestionView = (props) => {
  const question = props.question;

  if (question != undefined) {
    return (
      <ScrollView style={{flex: 1, backgroundColor: "white", margin: 10, borderRadius: 10, padding: 10}}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>{question.question_string}</Text>
          {question.answers.map((answer, index) => {
            return (
              <RadioButton key={index} selected={false} value={answer.answer_string} onPress={props.setUserAnswer} question={question} answer={answer} />
            )
          })}
        </View>
      </ScrollView>
    )
  } else {
    return (<></>)
  }
}