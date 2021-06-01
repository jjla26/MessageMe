import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function CustomText(props) {
  return <Text style={{ ...props.style, ...styles.text  }} >{props.children}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
  }
})