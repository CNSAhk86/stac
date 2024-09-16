import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

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
import TravelDetailScreen from './src/pages/TravelDetailScreen';
import TermsAgreementScreen from './src/pages/TermsAgreementScreen';  // 약관 동의 화면 import
import { ProfileProvider } from './src/contexts/ProfileContext';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigators for different sections of the app
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="PostScreen" component={PostScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
  </Stack.Navigator>
);

const PostStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PostScreen" component={PostScreen} />
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

import { useLayoutEffect } from 'react';

const TravelStack = ({ navigation }) => {
  useLayoutEffect(() => {
    const parentNavigator = navigation.getParent();

    return navigation.addListener('state', (e) => {
      const currentRoute = e.data.state.routes[e.data.state.index].name;

      if (currentRoute === 'TermsAgreement') {
        // Hide the bottom tab bar
        parentNavigator?.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        // Show the bottom tab bar
        parentNavigator?.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    });
  }, [navigation]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TravelScreen" component={TravelScreen} />
      <Stack.Screen
        name="TravelDetail"
        component={TravelDetailScreen}
        options={{
          presentation: 'modal',  // 모달 스타일 적용
          gestureEnabled: true,   // 스와이프 제스처 활성화
          gestureDirection: 'vertical',  // 스와이프 제스처 방향 설정
        }}
      />
      <Stack.Screen 
        name="TermsAgreement" 
        component={TermsAgreementScreen} 
      />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};


// Main tabs
const MainTabs = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();

  return (
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
      <Tab.Screen
        name="TravelTab"
        component={TravelStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="ChatTab" component={ChatScreen} options={{ headerShown: false }} />
      <Tab.Screen name="MyPageTab" component={MyPageStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

// Main app entry point
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
