import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth } from '@firebase/auth';
import { handleAuthentication } from './authFunctions';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    const error = await handleAuthentication(auth, null, email, password, true, () => {});
    if (error) {
      setErrorMessage(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>다시 만나서 반가워요!</Text>

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
            <Button title="로그인" onPress={handleSignIn} color="#3498db" />
          )}
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => navigation.navigate('SignUp')}>
            아직 계정이 없으신가요? 회원가입하기
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

export default SignInScreen;