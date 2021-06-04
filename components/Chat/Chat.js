import React, { useState, useEffect } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { db, auth } from '../../firebase'

// Component renders the chat view
export default function Chat(props) {
  const [ user, setUser ] = useState(null)
  const [ messages, setMessages ] = useState([])
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

  // Authentication and fetch of messages from firebase
  useEffect(() => {
    let unsubscribeMessages = () => {}
    const unsubscribeAuth = auth.onAuthStateChanged(async user => {
      if(!user){
        try {
          await auth.signInAnonymously();
        } catch (error) {
          console.log(error)
        }
      }
      setUser(user.uid)
      unsubscribeMessages = db.collection('messages').orderBy('createdAt', 'desc').onSnapshot(onCollectionUpdate)
    })
    return () => {
      unsubscribeMessages()
      unsubscribeAuth()
    }
  }, [])

  // Function to send a new message
  const onSend = message => {
    db.collection('messages').add({
      _id: message[0]._id,
      createdAt: message[0].createdAt,
      text: message[0].text,
      user: {
        _id: user,
        name: name
      }
    })
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        // renderBubble={renderBubble} // Attribute to customize the chat bubble
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
