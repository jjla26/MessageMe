import React, { useState, useEffect } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

// Component renders the chat view
export default function Chat(props) {
  const [ messages, setMessages ] = useState([])
  const name = props.route.params.name

  // Used useeffect to load some mock messages
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `${name} has joined to the chat`,
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  // Function to send a new message
  const onSend = messages => {
    setMessages(previousState => GiftedChat.append(previousState, messages))
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        renderBubble={renderBubble} // Attribute to customize the chat bubble
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {/* Fixed Keyboard hiding the input for android devices */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  )
}

function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        }
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
