import React from 'react';
import { StyleSheet } from 'react-native';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import usefont and apploading to load fonts
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';
// import views
import Start from './components/Start/Start'
import Chat from './components/Chat/Chat'

const Stack = createStackNavigator();

export default function App() {
  //Loading fonts
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf')
  });
  // Showing app logo until the fonts are loaded
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen 
          name="Home"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({ 
            title: route.params.name, 
            cardStyle: {
              backgroundColor: route.params.color
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
