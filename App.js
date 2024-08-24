import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import SignInScreen from './src/pages/SignInScreen';
import HomeScreen from './src/pages/HomeScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import PostScreen from './src/pages/PostScreen';
import WritePostScreen from './src/pages/WritePostScreen';
import ChatScreen from './src/pages/ChatScreen';
import MyPageScreen from './src/pages/MyPageScreen';
import TravelScreen from './src/pages/TravelScreen';

// Firebase configuration
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
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="PostScreen" component={PostScreen} />
    <Stack.Screen name="Travel" component={TravelScreen} />
  </Stack.Navigator>
);

const PostStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PostScreen" component={PostScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="WritePostScreen" component={WritePostScreen} />
  </Stack.Navigator>
);

const MyPageStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyPage" component={MyPageScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
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
      <SafeAreaView style={{ flex: 1 }}>
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
              } else if (route.name === 'Travel') {
                iconName = 'explore';
              } else if (route.name === 'MyPageTab') {
                iconName = 'person';
              }

              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: {
              fontSize: 10,
              paddingBottom: Platform.OS === 'ios' ? 0 : 0, // 텍스트의 아래쪽 여백을 최소화
            },
            tabBarIconStyle: {
              marginBottom: -5, // 아이콘을 조금 더 아래로 내립니다.
            },
            tabBarLabel: route.name === 'HomeTab' ? '홈 화면' :
                        route.name === 'PostTab' ? '게시글' :
                        route.name === 'ChatTab' ? '대화' :
                        route.name === 'Travel' ? '여행' : '마이페이지',
            tabBarActiveTintColor: '#333',
            tabBarInactiveTintColor: '#808080',
            tabBarStyle: {
              height: Platform.OS === 'ios' ? 50 : 50, // 메뉴바의 높이를 줄임
              paddingVertical: 0,
              borderTopWidth: 1,
              borderTopColor: '#ddd',
              backgroundColor: '#fff',
            },
          })}
        >
          <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="PostTab" component={PostStack} options={{ headerShown: false }} />
          <Tab.Screen name="Travel" component={TravelScreen} options={{ headerShown: false }} />
          <Tab.Screen name="ChatTab" component={ChatScreen} options={{ headerShown: false }} />
          <Tab.Screen name="MyPageTab" component={MyPageStack} options={{ headerShown: false }} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;