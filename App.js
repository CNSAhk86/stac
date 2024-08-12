import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import SignInScreen from './lib/SignInScreen';
import SignUpScreen from './lib/SignUpScreen';
import WaitingScreen from './lib/WaitingScreen';
import HomeScreen from './lib/HomeScreen';
import { checkEmailVerification } from './lib/authFunctions';

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
const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const auth = getAuth(app);

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
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} auth={auth} setUser={setUser} />}
          </Stack.Screen>
        ) : isWaiting ? (
          <Stack.Screen name="Waiting" component={WaitingScreen} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp">
              {props => <SignUpScreen {...props} setIsWaiting={setIsWaiting} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// 대충 커밋 잘 먹는지 확인해봄