import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);
  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '255268255127-5skbk61u32vu9rbq8kba3dg7etqpoud4.apps.googleusercontent.com',
    useProxy: true
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((error) => {
        console.error('Firebase sign-in failed: ', error);
      });
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    setLoading(true);
    promptAsync().finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Sign in with Google"
          onPress={handleGoogleSignIn}
          disabled={!request}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;