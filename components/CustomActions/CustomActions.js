import React, { useState } from 'react'
import { Actions } from 'react-native-gifted-chat'
import * as ImagePicker from 'expo-image-picker'

import { StyleSheet } from 'react-native'
import { storage } from '../../firebase'

export default function CustomActions(props) {
  const [ location, setLocation ] = useState(null)


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(status === 'granted'){
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        })
        if(!result.cancelled){
          const imageUrl = await uploadImage(result.uri);
          props.onSend({ image: imageUrl, text: '' });        
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      alert('Sorry, the permissions has been denied. Go to settings and give us some permissions');
    }
  }
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync() && ImagePicker.requestCameraPermissionsAsync()
    if(status === 'granted'){
      try {
        let result = await ImagePicker.launchCameraAsync()
        if(!result.cancelled){
          const imageUrl = await uploadImage(result.uri);
          props.onSend({ image: imageUrl, text: '' });        
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      alert('Sorry, the permissions has been denied. Go to settings and give us some permissions');
    }
  }
  const sendLocation = () => {

  }

  const uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];
    const ref = storage.ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  return (
    <Actions
      {...props}
      containerStyle={styles.container}
      options={{
        'Choose From Library': pickImage,
        'Take Picture': takePhoto,
        'Send Location': sendLocation,
        Cancel: () => {},
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
