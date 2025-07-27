// App.js
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/splashscreen';
import WelcomeScreen from './screens/welcomescreen';
import PlanSetupScreen from './screens/plansetupscreen';
import FirstStepScreen from './screens/firststepscreen';
import SecondStepScreen from './screens/secondstepscreen';
import SummaryScreen from './screens/summaryscreen';
import CalendarScreen from './screens/calendarscreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // esconde a status bar via expo-status-bar
    // (no Android o StatusBar.setHidden(true) também funcionaria)
    
    // esconde a navigation bar no Android
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('immersive');
      // opcional: modo “immersive” para reaparecer ao deslizar
      // NavigationBar.setBehaviorAsync('immersive');
    }
  }, []);

  return (
      <View style={styles.container}>
        {/* Isto oculta a status bar no topo */}
        <StatusBar hidden />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Splash"
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="PlanSetup" component={PlanSetupScreen} />
            <Stack.Screen name="FirstStep" component={FirstStepScreen} />
            <Stack.Screen name="SecondStep" component={SecondStepScreen} />
            <Stack.Screen name="Summary" component={SummaryScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
