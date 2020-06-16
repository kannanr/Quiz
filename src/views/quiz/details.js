import React, { useRef, forwardRef } from 'react';
import { View, ScrollView} from 'react-native';
import { Avatar, Text, Image, Icon } from 'react-native-elements'
import { Modalize } from 'react-native-modalize';

import { useCombinedRefs } from '../../helpers/use-combined-refs';

function renderCard(modalRef, navigation, quiz, index) {
  const name = quiz.name;
  const avatar = quiz.image_url;

  return (
    <View
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
            source={{
              uri: avatar,
            }}
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
                onPress={() => { modalRef.current.close(); navigation.navigate('Exams', { screen: 'Practice', initial: false, params: { quiz_id: quiz.id } }) }}
          />
          
        </View>
      </View>
    </View>
  );
}

export default QuizDetail = forwardRef((props, ref) => {
  const modalizeRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  return (
    <Modalize
      ref={combinedRef}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        stickyHeaderIndices: [0],
      }}
    >
      <View key={-1} style={{flex: 1, flexDirection: 'column', alignItems: "center", justifyContent: "center", paddingTop: 20}}></View>
      <View key={props.category.id} style={{flex: 1, flexDirection: 'column', alignItems: "flex-start", justifyContent: "center", padding: 20}}>
        <Image source={{ uri: props.category.image_url }} style={{ borderRadius: 10, width: 150, height: 150, resizeMode: "contain" }} />
        <Text h4 style={{alignItems: "flex-start", justifyContent: "flex-start"}}>Description</Text>
        <ScrollView style={{height: 300}}>
          <Text>Description: {props.category.description}</Text>
        </ScrollView>
        <Text h2>Quizzes Available</Text>
        {
          props.category.quizzes.map((quiz, index) => {
            return renderCard(combinedRef, props.navigation, quiz, index);
          })
        }
      </View>
    </Modalize>
  )
});
