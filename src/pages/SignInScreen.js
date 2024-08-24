import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '255268255127-a3uptqolr685lcajsijok8t90srf4iq9.apps.googleusercontent.com',
    expoClientId: '255268255127-6dd0696ae4buo67o4jc9tomugfhgfkav.apps.googleusercontent.com',
  },{
    projectNameForProxy: "@dev_hana/front"
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    setLoading(true);
    promptAsync().finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Image source={require('../../assets/icon.png')} style={styles.icon} />
          <Text style={styles.boldIntroText}>시니어와 청년의 소통창구</Text>
          <Text style={styles.lightIntroText}>방실에 오신 걸 환영합니다!</Text>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.googleButtonContainer} onPress={handleGoogleSignIn}>
            <Image source={require('../../assets/google-icon.png')} style={styles.googleIconButton} />
          </TouchableOpacity>
          <Text style={styles.privacyText}>
            개인정보에 대한 자세한 내용은{' '}
            <Text style={styles.privacyLink}>개인정보정책</Text>을 참고해주세요.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 250,
    height: 250,
    marginBottom: 0,
  },
  boldIntroText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  lightIntroText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  bottomContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  googleButtonContainer: {
    marginBottom: 10, 
  },
  googleIconButton: {
    width: 240,
    height: 50,
    resizeMode: 'contain',
  },
  privacyText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  privacyLink: {
    textDecorationLine: 'underline',
    color: '#888',
  },
});

export default SignInScreen;