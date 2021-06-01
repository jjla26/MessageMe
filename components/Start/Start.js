import React, { useState } from 'react'

// Importing components from react native
import { StyleSheet, TextInput, KeyboardAvoidingView, View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native'
import CustomText from '../Text/CustomText'
import PersonSvg from '../personsvg/PersonSvg'

// This component renders the starting screen
export default function Start(props) {
  const [ selectedColor, setSelectedColor ] = useState('#8A95A5')
  const [ name, setName ] = useState('')
  const selectColor = color => {
    setSelectedColor(color)
  }

  return (
    <ImageBackground source={require('../../img/BackgroundImage.png')} style={styles.backgroundImage} >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.backgroundImage} >
        <View style={styles.titleContainer}>
          <CustomText style={styles.title} type="600">MessageMe</CustomText>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.options}>
            <ScrollView contentContainerStyle={{flex:1}}>
            <View style={styles.inputContainer}>
              <View style={styles.inputBox}>
                <PersonSvg />
                <TextInput onChangeText={text => setName(text)} placeholder='Type your name' style={[styles.input, styles.optionTitle]}></TextInput>
              </View>
            </View>
            <View style={styles.colorsContainer}>
              <CustomText style={styles.optionTitle}>Choose Background Color:</CustomText> 
              <View style={styles.colorOptionsContainer}>
                {colors.map((color) =>
                  <TouchableWithoutFeedback key={color} onPress={() => selectColor(color)} >
                    <View style={styles.colorBorder(selectedColor === color)}>
                      <View style={[styles.color(color), styles.colorOption]}></View>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                onPress={() => props.navigation.navigate('Chat', {
                  name: name,
                  color: selectedColor
                })} 
                style={[styles.button]} >
                
                <CustomText style={{ ...styles.title, ...styles.buttonText }}>Start Chatting</CustomText>
              </TouchableOpacity>
            </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const colors = ['#090C08','#474056','#8A95A5','#B9C6AE']
// Component styles
const styles = StyleSheet.create({
  // Added full width and height tot he background container
  backgroundImage: {
    flex: 1,
  },
  // center content of the title container
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // Customize title font
  title: {
    color: '#FFF',
    fontSize: 45,
  },

  // Center content of the options container
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Create the white square for the options
  options: {
    backgroundColor: '#FFF',
    width: '88%', // 88% of the total 
    height: '88%', // 88% of the 50% which means 44%
    padding: '6%',
    justifyContent: 'space-between'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#757083',
  },
  // Create inputBox to wrap the input and the icon
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

  // Customize input font
  input: {
    flex:1,
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },

  // center content of the color section
  colorsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  // Colors options title
  optionTitle: {
    fontSize: 16,
    color: '#757083',
  },
  // Color options
  colorOptionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    marginVertical: 10
  },
  // outer circle selection
  colorBorder: border => ({
    borderWidth: 2, 
    borderRadius: 23, 
    width: 46, 
    height: 46, 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 4, 
    borderColor: border ? '#757083' : 'transparent',
  }),

  // Inner circle styles
  colorOption: {
    margin: 10,
    borderRadius: 17,
    width: 34,
    height: 34
  },
  color: color => ({
    backgroundColor: color,
  }),

  // button styles
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
});
