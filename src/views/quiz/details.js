import React, { useRef, forwardRef } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text } from 'react-native-elements'
import { Modalize } from 'react-native-modalize';

import { useCombinedRefs } from '../../helpers/use-combined-refs';

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
      <View key={props.category.id} style={{flex: 1, flexDirection: 'column', alignItems: "center", justifyContent: "center", padding: 20}}>
        <Image source={{ uri: props.category.image_url }} style={{ borderRadius: 10, backgroundColor: "white", width: 150, height: 150, resizeMode: "contain" }} />
        <Text h1>{props.category.name}</Text>
        <Text>Description: {props.category.description}</Text>
        <Text h4>Quizzes: {props.category.quizzes.length}</Text>
      </View>
    </Modalize>
  )
});
