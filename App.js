import React from 'react';
import { StyleSheet, View } from 'react-native';

import Start from './components/Start/Start'


export default function App() {
  return (
    <View style={styles.container}>
      <Start />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
