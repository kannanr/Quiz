import React, {useState, useEffect, useRef} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  // Text,
  StatusBar,
  FlatList,
  Image,
  Dimensions
} from 'react-native';

import {
  Button,
  Text,
} from 'react-native-elements'


import { Colors, } from 'react-native/Libraries/NewAppScreen';
const screenWidth = Dimensions.get("window").width
import { Portal } from 'react-native-portalize';

import { QUIZAPP_API_ENDPOINT } from 'react-native-dotenv'
import QuizDetail from './details';

export default QuizCategories = ({ navigation }) => {
  const modalizeRef = React.createRef(null);
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
                return <QuizDetail ref={el => (examCategoriesDetail[index] = el)} category={examCategory}/>
              })
            }
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
        // <View>
        //   <FlatList
        //     data={examCategories}
        //     keyExtractor={a => a.id}
        //     renderItem={({ item }) => (
        //       // Single Comes here which will be repeatative for the FlatListItems
        //       <View style={{ margin: 5, backgroundColor: "white", borderRadius: 10, padding: 10, flexDirection: 'row', justifyContent: "space-between" }}
        //             onStartShouldSetResponder={() => {return true}}
        //             onResponderRelease={() => navigation.push("Details", { name: item.name }) }
        //       >
        //         <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
        //           <Image source={{ uri: item.image_url }} style={{ width: 50, height: 50, resizeMode: "contain", marginRight: 20 }} />
        //           <View style={{ flexDirection: "column" }}>
        //             <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
        //             <Text style={styles.item}
        //             // onPress={this.GetItem.bind(this, 'Id : ' + item.id + ' Value : ' + item.value)}
        //             >
        //               {item.description}
        //             </Text>
        //           </View>
        //         </View>
        //         <View style={{ flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
        //           <Button
        //             title="Practice"
        //             buttonStyle={{
        //               height: 33,
        //               // width: 120,
        //               // backgroundColor: 'rgba(113, 154, 112, 1)',
        //               borderRadius: 5,
        //             }}
        //             titleStyle={{
        //               // fontFamily: 'regular',
        //               fontSize: 13,
        //               color: 'white',
        //             }}
        //             onPress={() => console.log('aye')}
        //             underlayColor="transparent"
        //           />
  
        //         </View>
        //       </View>
        //     )}
        //   />
        // </View>
        
        // {/* <FlatList
        //     style={{flex: 1, flexDirection: 'column'}}
        //     data={examCategories}
        //     horizontal={false}
        //     numColumns={4}
            
        //     keyExtractor={a => a.id}
        //     renderItem={({ item }) => (
        //       // Single Comes here which will be repeatative for the FlatListItems
        //       <View style={{ margin: 5, backgroundColor: "white", borderRadius: 10, padding: 15, width: 150, height: 150 }}
        //             onStartShouldSetResponder={() => {return true}}
        //             onResponderRelease={() => navigation.push("Details", { name: item.name }) }
        //       >
        //         <Image source={{ uri: item.image_url }} style={{ width: 120, height: 120, resizeMode: "contain", marginRight: 20 }} />
        //       </View>
        //     )}
        //   /> */}
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
