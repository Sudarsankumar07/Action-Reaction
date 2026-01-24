import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ScoreboardScreen from './src/screens/ScoreboardScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { signInAnonymously, onAuthStateChanged } from './src/services/firebaseAuth';

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        console.log('🚀 Initializing Action Reaction app...');

        // Only initialize Firebase on native platforms (not web)
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
          console.log('🔥 Starting Firebase Anonymous Authentication...');
          const authResult = await signInAnonymously();

          if (authResult.success) {
            console.log('✅ Firebase Authentication successful!');
            console.log('👤 User ID:', authResult.uid);
          } else {
            console.error('❌ Firebase Authentication failed:', authResult.error);
            console.warn('⚠️ App will continue but API calls may fail');
          }
        } else {
          console.log('🌐 Running on web - Firebase native authentication not available');
          console.warn('⚠️ Web platform detected - using fallback mode (API calls will use mock authentication)');
        }

        // Simulate minimum splash screen display time (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn('⚠️ Error during app initialization:', {
          error: e,
          message: e?.message,
          stack: e?.stack,
        });
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();

    // Only listen for auth state changes on native platforms
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // Listen for auth state changes (token refresh, etc.)
      const unsubscribe = onAuthStateChanged((user) => {
        if (user) {
          console.log('🔥 Firebase auth state changed - User:', user.uid);
        } else {
          console.log('⚠️ User signed out, re-authenticating...');
          signInAnonymously();
        }
      });

      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up Firebase auth listener');
        unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    async function hideSplash() {
      if (appIsReady) {
        // Hide splash screen once app is ready
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Keep splash screen visible
  }

  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Scoreboard" component={ScoreboardScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
