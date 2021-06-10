import React, { useState, useEffect, useRef } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { db, auth } from '../../firebase'

// Component renders the chat view
export default function Chat(props) {
  const isMounted = useRef(false)
  const [ user, setUser ] = useState(null)
  const [ messages, setMessages ] = useState([])
  const [ online, setOnline ] = useState(false)
  const name = props.route.params.name

  // Function that updates list of messages
  const onCollectionUpdate = querySnapshot => {
    const allMessages = []
    querySnapshot.forEach( doc => {
      const data = doc.data()
      allMessages.push({
        _id: doc.id,
        text: data.text,
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
        createdAt: data.createdAt.toDate()
      })
    })
    setMessages(allMessages)
  }

  // Function to get the messages from asyncstorage
  const getMessages = async () =>  {
    let messages = '';
    let user = '';
    try {
      user = await AsyncStorage.getItem('user')
      messages = await AsyncStorage.getItem('messages') || [];
      setUser(user)
      setMessages(JSON.parse(messages))
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to save the messages in asyncstorage
  const saveMessages = async () => {
    console.log(messages)
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  //Function to delete messages from asyncstorage
  const deleteMessages = async () =>  {
    try {
      await AsyncStorage.removeItem('messages');
      setMessages([])
    } catch (error) {
      console.log(error.message);
    }
  }

  // Authentication and fetch of messages from firebase
  useEffect(() => {
    let unsubscribeMessages = () => {}
    let unsubscribeAuth = () => {}
    NetInfo.fetch().then(connection => {
      if(connection.isConnected){
        setOnline(true)
        unsubscribeAuth = auth.onAuthStateChanged(async user => {
          const messages = await AsyncStorage.getItem('messages') || [];
          console.log(messages)
          if(!user){
            try {
              await auth.signInAnonymously();
            } catch (error) {
              console.log(error)
            }
          }
          setUser(user.uid)
          unsubscribeMessages = db.collection('messages').orderBy('createdAt', 'desc').onSnapshot(onCollectionUpdate)
          AsyncStorage.setItem('user', user.uid)
        })
      }else{
        setOnline(false)
        getMessages()
      }
    })
    return () => {
      unsubscribeMessages()
      unsubscribeAuth()
    }
  }, [])

  useEffect(() => {
    if(isMounted.current){
      saveMessages()
    }
    isMounted.current = true 
  }, [messages])

  // Function to send a new message
  const onSend = message => {
    const msg = {
      _id: message[0]._id,
      createdAt: message[0].createdAt,
      text: message[0].text,
      user: {
        _id: user,
        name: name
      }
    }
    db.collection('messages').add(msg)
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        // renderBubble={renderBubble} // Attribute to customize the chat bubble
        renderInputToolbar={online ? renderInputToolbar : () => {}}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user,
        }}
      />
      {/* Fixed Keyboard hiding the input for android devices */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  )
}

const renderInputToolbar = props => {
  return <InputToolbar {...props} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
