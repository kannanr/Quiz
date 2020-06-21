import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import RadioButton from '../../components/radio_button'

export default QuestionView = (props) => {
  const question = props.question;

  if (question != undefined) {
    return (
      <ScrollView style={{flex: 1, backgroundColor: "white", margin: 10, borderRadius: 10, padding: 10}}>
        <View style={{ flex: 1, marginRight: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>{question.question_string}</Text>
          {question.answers.map((answer, index) => {
            return (
              <RadioButton key={index} selected={answer.id == props.userAnswer} value={answer.answer_string} onPress={props.setUserAnswer} question={question} answer={answer} />
            )
          })}
        </View>
      </ScrollView>
    )
  } else {
    return (<></>)
  }
}