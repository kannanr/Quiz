import React from 'react'

import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

export default Pagination = ({itemsPerPage, totalItems, currentItem, paginate}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const previousButton = () => (
    <Button title=" < Previous" onPress={() => paginate(currentItem - 1)} disabled={currentItem > 0 ? false : true} buttonStyle={ styles.button } titleStyle={ styles.buttonText} />
  )

  const nextButton = () => (
    <Button title="Next > " onPress={() => paginate(currentItem+1)} disabled={currentItem + 1 < totalItems ? false : true} buttonStyle={ styles.button } titleStyle={ styles.buttonText}/>
  )

  return (
    <View style={{height: 40}}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
        {previousButton()}
        {nextButton()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    height: 33,
    width: 120,
  },
  buttonText: {
    fontSize: 13,
    color: '#212529',
  }
})