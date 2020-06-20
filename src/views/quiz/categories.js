import React, {useState, useEffect, useRef} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';
const screenWidth = Dimensions.get("window").width
import { Portal } from 'react-native-portalize';

import { QUIZAPP_API_ENDPOINT } from 'react-native-dotenv'
import QuizDetail from './details';

export default QuizCategories = ({ navigation }) => {
  var examCategoriesDetail = []
  const [examCategories, setExamCategory] = useState([]);

  useEffect(() => {
    var body =
    {
      "query": `{
        examCategory{
          id
          name
          image_url
          description
          
          quizzes {
            id
            name
            description
            allotted_time
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
      setExamCategory(resultData.data.examCategory)
      resultData.data.examCategory.map((category, index) => {
        examCategoriesDetail.push(React.createRef(null))
      })
    }).catch(err => console.log(err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
          {
            examCategories.map((examCategory, index) => {
              return <View style={{ margin: 7 }}
                    key={examCategory.id}
                    onStartShouldSetResponder={() => {return true}}
                    onResponderRelease={() => examCategoriesDetail[index].open() }
              >
                <Image source={{ uri: examCategory.image_url }} style={{ borderRadius: 10, backgroundColor: "white", width: ((screenWidth / 2) - 15), height: ((screenWidth / 2) - 15), resizeMode: "contain" }} />
              </View>
            })
          }
          <Portal>
            {
              examCategories.map((examCategory, index) => { 
                return <QuizDetail key={index} ref={el => (examCategoriesDetail[index] = el)} category={examCategory} navigation={navigation}/>
              })
            }
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.darkgrey,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
