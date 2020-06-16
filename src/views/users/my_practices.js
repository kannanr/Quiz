import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Dimensions
} from 'react-native';
import { QUIZAPP_API_ENDPOINT } from 'react-native-dotenv'

const screenWidth = Dimensions.get("window").width

export default MyAttempts = ({ navigation }) => {
  const [quizAttempts, setQuizAttempts] = useState([]);

  useEffect(() => {
    var body =
    {
      "query": `{
        myExamAttempts(user_id:1, exam_category:"ACT"){
          id
          
          quiz {
            id
            name
            quiz_image
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
      },
      body: JSON.stringify(body),
    }).then(response => response.json()).then(resultData => {
      setQuizAttempts(resultData.data.myExamAttempts)
    }).catch(err => console.log(err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
          {
            quizAttempts.map((attempt, index) => {
              return <View style={{ margin: 7 }}
                    key={attempt.id}
                    onStartShouldSetResponder={() => {return true}}
                    // onResponderRelease={() => quizAttempts[index].open() }
              >
                <Image source={{ uri: attempt.quiz.quiz_image }} style={{ borderRadius: 10, backgroundColor: "white", width: ((screenWidth / 2) - 15), height: ((screenWidth / 2) - 15), resizeMode: "contain" }} />
              </View>
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
