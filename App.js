import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInScreen from './lib/SignInScreen';
import SignUpScreen from './lib/SignUpScreen';
import WaitingScreen from './lib/WaitingScreen';
import HomeScreen from './src/HomeScreen';
import { checkEmailVerification } from './lib/authFunctions';
import ProfileScreen from './src/ProfileScreen'; // Adjust the path as necessary

const firebaseConfig = {
  apiKey: "AIzaSyAlnN8JjUTs817c0aDP08D6Rjbe9DXSPwo",
  authDomain: "stac-c27d6.firebaseapp.com",
  projectId: "stac-c27d6",
  storageBucket: "stac-c27d6.appspot.com",
  messagingSenderId: "255268255127",
  appId: "1:255268255127:web:8768901ee3368c3c4d40d2",
  measurementId: "G-V9M2T6R7XB"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.emailVerified) {
          setUser(currentUser);
          setIsWaiting(false);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (isWaiting) {
      const interval = setInterval(() => {
        checkEmailVerification(auth, setUser, setIsWaiting);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isWaiting]);

  return (
<NavigationContainer>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {user ? (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </>
    ) : isWaiting ? (
      <Stack.Screen name="Waiting" component={WaitingScreen} />
    ) : (
      <>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </>
    )}
  </Stack.Navigator>
</NavigationContainer>
  );
};

export default App;