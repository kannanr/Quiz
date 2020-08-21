import React, { useState, useEffect, useRef } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements'
import { QUIZAPP_API_ENDPOINT } from 'react-native-dotenv'
import Result from '../quiz/result'
import { Portal } from 'react-native-portalize';
import { LineChart} from "react-native-chart-kit";

export default MyAttempts = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [quizAttempts, setQuizAttempts] = useState([]);
  var quizResults = []
  const currentExamAttempt = useState(null);
  const [score, setScore] = useState([0]);

  loadMyAttempts = () => {
    var body =
      {
        "query": `{
          myExamAttempts(user_id:1){
            id
            score
            max_score
            
            user_answers {
              id
              answer_id
              question_id
              is_correct
              
              given_answer{
                id
                answer_string
                correct
              }
            }
            quiz {
              id
              name
              quiz_image
              questions {
                id
                question_string
                answers {
                  id
                  answer_string
                  correct
                }
              }
              exam_category {
                id
                name
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
        setQuizAttempts(resultData.data.myExamAttempts);
        resultData.data.myExamAttempts.map(() => {
          quizResults.push(React.createRef(null))
        })
        setRefreshing(false);
        setScore(resultData.data.myExamAttempts.map((attempt) => { return attempt.score}))
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    loadMyAttempts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadMyAttempts} />
        }>
          <View style={styles.container}>
            <LineChart
              data={{
                datasets: [
                  {
                    data: score
                  }
                ]
              }}
              width={Dimensions.get("window").width-20} // from react-native
              height={220}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
        <View style={{flex: 1}}>
          {
            quizAttempts.map((attempt, index) => {
              const examAttempt = attempt;
              const name = examAttempt.quiz.name;
              const avatar = examAttempt.quiz.quiz_image;
              return <View
                key={index}
                style={{
                  height: 60,
                  marginHorizontal: 10,
                  marginTop: 10,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginLeft: 15 }}>
                    <Avatar
                      small
                      rounded
                      source={{ uri: avatar, }}
                      imageProps={{resizeMode: "contain"}}
                      activeOpacity={0.7}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 10,
                      color: 'gray',
                    }}
                  >
                    {name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >

                  <View
                    style={{
                      
                      ...(examAttempt.score > (examAttempt.max_score * 0.5) ? styles.positive : styles.negative),
                      ...styles.result
                    }}
                  >
                    <Icon name={examAttempt.score > (examAttempt.max_score * 0.5) ? "md-arrow-dropup" : "md-arrow-dropdown"} type="ionicon" color={examAttempt.score > (examAttempt.max_score * 0.5) ? "green" : "red"} size={25} />
                    <Text
                      style={{
                        ...(examAttempt.score > (examAttempt.max_score * 0.5) ? styles.positive : styles.negative),
                        fontSize: 13,
                        marginLeft: 5,
                      }}
                    >
                      {examAttempt.score} / {examAttempt.max_score}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(222,222,222,1)',
                      width: 35,
                      height: 28,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}
                  >
                    <Icon name="play-circle" type="material-community" color="gray" size={20}
                          onPress={() => quizResults[index].open() }
                    />
                    
                  </View>
                </View>
              </View>
            })
          }
          <Portal>
            {
              quizAttempts.map((attempt, index) => { 
                return <Result key={index} ref={el => (quizResults[index] = el)} examAttempt={attempt} navigation={navigation}/>
              })
            }
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10

  },
  chart: {
    flex: 1
  },
  result: {
    width: 70,
    height: 28,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  positive: {
    backgroundColor: 'rgba(220,230,218,1)',
    color: 'green',
  },
  negative: {
    backgroundColor: 'rgba(244,230,224,1)',
    color: 'red'
  }
})