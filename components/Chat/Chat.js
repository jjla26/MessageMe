import React from 'react'
import { View, Text } from 'react-native'

export default function Chat(props) {
  const { name, color } = props.route.params;
  console.log(name, color)

  return (
    <View>
      <Text>Chat view</Text>
    </View>
  )
}
