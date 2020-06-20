import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { QUIZAPP_API_ENDPOINT } from 'react-native-dotenv'
import QuestionView from './question_view';
import Pagination from '../../components/pagination'


export default QuizPractice = (props) => {
  const itemsPerPage = 1;
  const currentUserID = 1;
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentExamAttemptID, setCurrentExamAttemptID] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    var createExamBody = {
      "query": `
      mutation {
        createExamAttempt(user_id:1, quiz_id:${props.route.params.quiz_id}) {
          id
        } 
      }
      `
    }
    fetch(QUIZAPP_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer abcd`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(createExamBody),
    }).then(response => response.json()).then(resultData => {
      setCurrentExamAttemptID(resultData.data.createExamAttempt.id);
    }).catch(err => console.log(err));

    var body =
    {
      "query": `{
        quiz(id: ${props.route.params.quiz_id}) {
          id
          name
          questions {
            id
            question_string
            answers {
              id
              answer_string
            }
          }
        }
      }    
      `
    }
    fetch(QUIZAPP_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer abcd`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(response => response.json()).then(resultData => {
      setQuestions(resultData.data.quiz[0].questions);
      setCurrentQuestion(resultData.data.quiz[0].questions[currentQuestionIndex]);
    }).catch(err => console.log(err));
  }, []);
  
  const setUserAnswer = (item, question, answer) => {
    userAnswers[question.id] = answer.id
    setUserAnswers(userAnswers)
    setCurrentQuestionAnswer(answer.id)
    saveUserAnswer(currentUserID, question.id, answer.id, currentExamAttemptID, 10);
  }

  const saveUserAnswer = (user_id, question_id, answer_id, exam_attempt_id, time_taken) => {
    var body = {
      "query": `mutation {
        saveUserAnswer(user_id: ${user_id}, question_id:${question_id}, answer_id:${answer_id}, exam_attempt_id:${exam_attempt_id}, time_taken:${time_taken}) {
          id
        }
      }
      `
    }

    fetch(QUIZAPP_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer abcd`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(response => response.json())
    .catch(err => console.log(err));
  }

  const submitExam = (user_id, exam_attempt_id) => {
    var body = {
      "query": `mutation {
        submitExam(user_id:${user_id}, exam_attempt_id:${exam_attempt_id}) {
          id
        } 
      }      
      `
    }

    fetch(QUIZAPP_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer abcd`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(response => response.json()).then(resultData => {
      // console.log(resultData);
      props.navigation.navigate('Home', { screen: 'My Exams', initial: false })
    }).catch(err => console.log(err));
  }

  const paginate = currentItem => { setCurrentQuestionIndex(currentItem); setCurrentQuestion(questions[currentItem]); setCurrentQuestionAnswer(userAnswers[questions[currentItem].id]) };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View key={1} style={{flex: 1, flexDirection: 'column', padding: 10, justifyContent: 'space-between'}}>
        <QuestionView question={currentQuestion} setUserAnswer={setUserAnswer} userAnswer={currentQuestionAnswer}/>
      
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={questions.length}
          currentItem={currentQuestionIndex}
          paginate={paginate}
        />
        {
          currentQuestionIndex + 1 >= questions.length ? 
            (
              <Button
                title="Submit"
                buttonStyle={{ ...styles.button, alignSelf: 'flex-end' }}
                titleStyle={styles.buttonText}
                onPress={() => submitExam(currentUserID, currentExamAttemptID)}
              />
            )
          :
            (
            <Button
              title="Exit"
              buttonStyle={{
                ...styles.button,                
                backgroundColor: '#f8f9fa',
                borderColor: '#f8f9fa',
                alignSelf: 'flex-start',
              }}
              titleStyle={styles.buttonText}
              onPress={() => props.navigation.navigate('Home', { screen: 'All Exams', initial: false })}
              
              underlayColor="transparent"
            />
            )
        }
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
    height: 33,
    width: 120,
  },
  buttonText: {
    fontSize: 13,
    color: '#212529',
  }
})