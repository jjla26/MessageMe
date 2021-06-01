import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font'
import Start from './components/Start/Start'

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
