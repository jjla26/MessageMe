import React from 'react'
import { Text, StyleSheet } from 'react-native'

// HOC to render customized fonts
export default function CustomText(props) {
  let fontType
  switch (props.type) {
    case '900':
      fontType = 'ExtraBold'
      break;
    case '600':
      fontType = 'Bold'
      break;
    case 'Italic':
      fontType = 'Italic' 
      break;
    case '100':
      fontType = 'Light'
      break; 
    default:
      fontType = 'Regular'
      break;
  }

  return <Text style={{ ...props.style, ...styles.text(fontType) }} >{props.children}</Text>
}

const styles = StyleSheet.create({
  text: fontType => ({
    fontFamily: `Poppins-${fontType}`
  })
})