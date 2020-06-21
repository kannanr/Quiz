import React, { useRef, forwardRef } from 'react';
import { View, ScrollView, Dimensions, Share } from 'react-native';
import { Text, Card, Icon } from 'react-native-elements'
import { Modalize } from 'react-native-modalize';

import { useCombinedRefs } from '../../helpers/use-combined-refs';

export default Result = forwardRef((props, ref) => {
  const modalizeRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, modalizeRef);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Heya, bragging here - see i've scored ${props.examAttempt.score} out of ${props.examAttempt.max_score} in ${props.examAttempt.quiz.exam_category.name} Practice test.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
 

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
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 100}}>
          <Text h3 style={{ padding: 20, color: 'white' }}>{props.examAttempt.quiz.exam_category.name} - {props.examAttempt?.quiz.name}</Text>
          <Icon name="share-alt-square" type="font-awesome" color="tomato" size={30} onPress={() => onShare() } 
                style={{
                  width: 35,
                  height: 28,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}
          />
        </View>
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
                      backgroundColor: isCorrectAnswer ? 'rgba(220,230,218,1)' : 'rgba(244,230,224,1)',
                      borderColor: isCorrectAnswer ? 'rgba(220,230,218,1)' : 'rgba(244,230,224,1)',
                      borderRadius: 15,
                      color: isCorrectAnswer ? 'green' : 'red',
                    }}
                    title={question.question_string}
                  >
                    <View style={{color: isCorrectAnswer ? 'green' : 'red', marginRight: 30}}>
                      {question.answers.map((answer, index) => {
                        return <RadioButton key={index} selected={answer.id == userAnswer} value={answer.answer_string} isCorrectAnswer={answer.id === correctAnswer}/>
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