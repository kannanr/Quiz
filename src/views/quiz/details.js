import React, { useRef, forwardRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
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
      <View key={1} style={{flex: 1, flexDirection: 'column', alignItems: "center", justifyContent: "center", paddingTop: 20, height: 500}}>
          <Image source={{ uri: props.category.image_url }} style={{ borderRadius: 10, backgroundColor: "white", width: 150, height: 150, resizeMode: "contain" }} />
          <Text h1>{props.category.name}</Text>
          <Text h4>Description: {props.category.description}</Text>
          <Text h4>Quizzes: {props.category.quizzes.length}</Text>
        </View>
    </Modalize>
  )
});

const s = StyleSheet.create({
  content__header: {
    padding: 15,
    paddingBottom: 0,

    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  content__heading: {
    marginBottom: 2,

    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },

  content__subheading: {
    marginBottom: 20,

    fontSize: 16,
    color: '#ccc',
  },

  content__inside: {
    padding: 15,
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: '200',
    lineHeight: 22,
    color: '#666',
  },

  content__scrollview: {
    marginVertical: 20,
  },

  content__block: {
    width: 200,
    height: 80,

    marginRight: 20,

    backgroundColor: '#ccc',
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 10,

    width: '100%',

    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#cdcdcd',
    borderRadius: 6,
  },
});
