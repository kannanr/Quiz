import React, { useRef, forwardRef, useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Avatar, Text, Image, Icon, Card } from 'react-native-elements'
import { Modalize } from 'react-native-modalize';

import { useCombinedRefs } from '../../helpers/use-combined-refs';

export default Result = forwardRef((props, ref) => {
  const modalizeRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, modalizeRef);

  return (
    <Modalize
      ref={combinedRef}
      modalStyle={{ backgroundColor: '#1a1d21' }}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        stickyHeaderIndices: [0],
      }}
    >
      <View key={-1} style={{}}></View>
      <View key={props.examAttempt.id} style={{ flex: 1 }}>
        <Text h3 style={{ padding: 20, color: 'white'}}>{props.examAttempt.quiz.exam_category.name} - {props.examAttempt?.quiz.name}</Text>
        <ScrollView style={{height: Dimensions.get('window').height, flex: 1}}>
          <View style={{marginBottom: 200}}>
          {
            props.examAttempt.quiz.questions.map((question, index) => {
              const correctAnswer = question.answers.find(x => x.correct === true)?.id;
              const userAnswer = props.examAttempt.user_answers.find(x => x.question_id === question.id)?.answer_id;
              const isCorrectAnswer = userAnswer === correctAnswer ;
              return (
                <View style={{  }} key={question.id} >
                  <Card
                    containerStyle={{
                      marginTop: 15,
                      backgroundColor: isCorrectAnswer ? 'rgba(220,230,218,1)' : 'rgba(244,230,224,1)',//</View>'#d1d2d2',
                      borderColor: isCorrectAnswer ? 'rgba(220,230,218,1)' : 'rgba(244,230,224,1)',//</View>'#d1d2d2',
                      borderRadius: 15,
                      color: isCorrectAnswer ? 'green' : 'red',
                    }}
                    title={question.question_string}
                  >
                    <View style={{color: isCorrectAnswer ? 'green' : 'red',}}>
                      {question.answers.map((answer, index) => {
                        // const isThisTheCorrectAnswer = answer.id == props.examAttempt.user_answers.find(x => x.question_id === question.id)?.answer_id
                        return <RadioButton key={index} selected={answer.id == userAnswer} value={answer.answer_string} isCorrectAnswer={answer.id === correctAnswer}/>
                        // <Text key={index} style={{ color: 'black' }}>{answer.answer_string}</Text>
                      })}
                      <Text style={{color: isCorrectAnswer ? 'green' : 'red',}}>Correct Answer: {question.answers.find(x => x.correct === true)?.answer_string} </Text>
                    </View>
                  </Card>
                </View>
              )
            })
          }
          </View>
        </ScrollView>
      </View>
    </Modalize>
  )
});
