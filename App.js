import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import SignInScreen from './src/pages/SignInScreen';
import HomeScreen from './src/pages/HomeScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import PostScreen from './src/pages/PostScreen';
import WritePostScreen from './src/pages/WritePostScreen';
import ChatScreen from './src/pages/ChatScreen';
import MyPageScreen from './src/pages/MyPageScreen'; 

const firebaseConfig = {
  apiKey: "AIzaSyAlnN8JjUTs817c0aDP08D6Rjbe9DXSPwo",
  authDomain: "stac-c27d6.firebaseapp.com",
  projectId: "stac-c27d6",
  storageBucket: "stac-c27d6.appspot.com",
  messagingSenderId: "255268255127",
  appId: "1:255268255127:web:8768901ee3368c3c4d40d2",
  measurementId: "G-V9M2T6R7XB"
};

let app;
let auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApps()[0];
  auth = getAuth(app);
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="PostScreen" component={PostScreen} />
    <Stack.Screen name="WritePostScreen" component={WritePostScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const TravelScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Travel Screen</Text>
  </View>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'HomeTab') {
                iconName = 'home';
              } else if (route.name === 'PostTab') {
                iconName = 'forum';
              } else if (route.name === 'ChatTab') {
                iconName = 'chat';
              } else if (route.name === 'TravelTab') {
                iconName = 'explore';
              } else if (route.name === 'MyPageTab') {
                iconName = 'person';
              }

              return <MaterialIcons name={iconName} size={25} color={color} />;
            },
            tabBarLabelStyle: {
              marginTop: 3,
              fontSize: 9,
            },
            tabBarIconStyle: {
              marginBottom: -5,
            },
            tabBarLabel: route.name === 'HomeTab' ? '홈 화면' :
                        route.name === 'PostTab' ? '게시글' :
                        route.name === 'ChatTab' ? '대화' :
                        route.name === 'TravelTab' ? '여행' : '마이페이지',
            tabBarActiveTintColor: '#333',
            tabBarInactiveTintColor: '#808080',
            tabBarStyle: {
              height: 60,
              paddingVertical: 5,
              borderTopWidth: 1,
              borderTopColor: '#ddd',
              backgroundColor: '#fff',
            },
          })}
        >
          <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="PostTab" component={PostScreen} options={{ headerShown: false }} />
          <Tab.Screen name="TravelTab" component={TravelScreen} options={{ headerShown: false }} />
          <Tab.Screen name="ChatTab" component={ChatScreen} options={{ headerShown: false }} />
          <Tab.Screen name="MyPageTab" component={MyPageScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;