import React from 'react'
import { Actions } from 'react-native-gifted-chat'

import { StyleSheet } from 'react-native'

export default function CustomActions(props) {
  return (
    <Actions
      {...props}
      containerStyle={styles.container}
      options={{
        'Choose From Library': () => {
          console.log('choose');
        },
        'Take Picture': () => {
          console.log('pic');
        },
        'Send Location': () => {
          console.log('loc');
        },
        Cancel: () => {
          console.log('Cancel');
        },
      }}
    />
    )
  }

  const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
})
