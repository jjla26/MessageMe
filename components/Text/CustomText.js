import React from 'react'
import { Text, StyleSheet } from 'react-native'

// HOC to render customized fonts
export default function CustomText(props) {
  return <Text style={{ ...props.style, ...styles.text  }} >{props.children}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
  }
})