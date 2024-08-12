import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth } from '@firebase/auth';
import { handleAuthentication } from './authFunctions';

const SignUpScreen = ({ navigation, setIsWaiting }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleSignUp = async () => {
    setLoading(true);
    setErrorMessage('');
    const error = await handleAuthentication(auth, null, email, password, false, setIsWaiting);
    if (error) {
      setErrorMessage(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>방실에 오신 걸 환영합니다!</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일 아이디를 입력해주세요"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#3498db" />
          ) : (
            <Button title="이메일 인증하기" onPress={handleSignUp} color="#3498db" />
          )}
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => navigation.navigate('SignIn')}>
            이미 계정이 있나요? 로그인하기
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    width: '100%',
  },
  buttonContainer: {
    marginBottom: 16,
    width: '100%',
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpScreen;