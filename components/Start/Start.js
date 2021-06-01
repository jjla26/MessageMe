import React, { useState } from 'react'

// Importing components from react native
import { StyleSheet, TextInput, View, TouchableOpacity, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native'
import { SvgXml } from 'react-native-svg'
import CustomText from '../Text/CustomText'
import PersonSvg from '../personsvg/PersonSvg'

// This component renders the starting screen
export default function Start() {
  const [ selectedColor, setSelectedColor ] = useState('')
  const selectColor = color => {
    setSelectedColor(color)
  }

  return (
    <ImageBackground source={require('../../img/BackgroundImage.png')} style={styles.backgroundImage} >
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>MessageMe</CustomText>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.options}>
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <PersonSvg />
              <TextInput placeholder='Type your name' style={[styles.input, styles.optionTitle]}></TextInput>
            </View>
          </View>
          <View style={styles.colorsContainer}>
            <CustomText style={styles.optionTitle}>Choose Background Color:</CustomText> 
            <View style={styles.colorOptionsContainer}>
              {colors.map((color) =>
                <TouchableWithoutFeedback key={color} onPress={() => selectColor(color)} >
                  <View style={styles.colorBorder(selectedColor === color)}>
                    <View style={[styles.color, styles.colorOption(color)]}></View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button]}>
              <CustomText style={{ ...styles.title, ...styles.buttonText }}>Start Chatting</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const colors = ['#090C08','#474056','#8A95A5','#B9C6AE']
// Component styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  options: {
    backgroundColor: '#FFF',
    width: '88%', // 88% of the total 
    height: '88%', // 88% of the 50% which means 44%
    padding: '6%',
    justifyContent: 'space-between'
  },
  title: {
    color: '#FFF',
    fontSize: 45,
    fontWeight: '600',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  inputBox:{
    height: 60,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 2,
    paddingHorizontal: 20,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex:1,
    fontFamily: 'Poppins',
    marginLeft: 10,
  },
  button:{
    fontSize: 16,
    backgroundColor: '#757083',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16
  },
  colorOptionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start', 
  },
  colorBorder: border => ({
    borderWidth: 2, 
    borderRadius: 30, 
    width: 60, 
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 3, 
    borderColor: border ? '#757083' : 'transparent',
  }),
  color: {
    margin: 10,
    borderRadius: 23,
    width: 46,
    height: 46
  },
  colorOption: color => ({
    backgroundColor: color,
  }),
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#757083',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  colorsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
});
