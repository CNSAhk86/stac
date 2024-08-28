import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'; // Realtime Database 추가

import SignInScreen from './src/pages/SignInScreen';
import SignUpScreen from './src/pages/SignUpScreen';
import HomeScreen from './src/pages/HomeScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import PostScreen from './src/pages/PostScreen';
import WritePostScreen from './src/pages/WritePostScreen';
import ChatScreen from './src/pages/ChatScreen';
import MyPageScreen from './src/pages/MyPageScreen';
import TravelScreen from './src/pages/TravelScreen';
import InitialProfileSetupScreen from './src/pages/InitialProfileSetupScreen';

// Context for managing profile
import { ProfileProvider } from './src/contexts/ProfileContext';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlnN8JjUTs817c0aDP08D6Rjbe9DXSPwo",
  authDomain: "stac-c27d6.firebaseapp.com",
  databaseURL: "https://stac-c27d6-default-rtdb.firebaseio.com",
  projectId: "stac-c27d6",
  storageBucket: "stac-c27d6.appspot.com",
  messagingSenderId: "255268255127",
  appId: "1:255268255127:web:8768901ee3368c3c4d40d2",
  measurementId: "G-V9M2T6R7XB"
};

// Firebase 초기화
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="PostScreen" component={PostScreen} />
    <Stack.Screen name="Travel" component={TravelScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
  </Stack.Navigator>
);

const PostStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PostScreen" component={PostScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="WritePostScreen" component={WritePostScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
  </Stack.Navigator>
);

const MyPageStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyPage" component={MyPageScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
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

        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: {
        fontSize: 10,
        paddingBottom: Platform.OS === 'ios' ? 0 : 5,
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
        height: Platform.OS === 'ios' ? 50 : 50,
        paddingVertical: 0,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="PostTab" component={PostStack} options={{ headerShown: false }} />
    <Tab.Screen name="TravelTab" component={TravelScreen} options={{ headerShown: false }} />
    <Tab.Screen name="ChatTab" component={ChatScreen} options={{ headerShown: false }} />
    <Tab.Screen name="MyPageTab" component={MyPageStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (authUser && !authUser.displayName) {
        setIsNewUser(true);
      } else {
        setIsNewUser(false);
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
    <ProfileProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              isNewUser ? (
                <>
                  <Stack.Screen name="InitialProfileSetupScreen" component={InitialProfileSetupScreen} />
                  <Stack.Screen name="MainTabs" component={MainTabs} />
                </>
              ) : (
                <Stack.Screen name="MainTabs" component={MainTabs} />
              )
            ) : (
              <>
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </ProfileProvider>
  );
};

export default App;
