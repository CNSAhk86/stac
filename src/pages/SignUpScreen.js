import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleSignUp = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // 회원가입 성공 시 프로필 설정 페이지로 이동
      navigation.navigate('InitialProfileSetupScreen');
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>회원가입</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력하세요"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#3498db" />
          ) : (
            <Button title="회원가입" onPress={handleSignUp} color="#3498db" />
          )}
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => navigation.navigate('SignInScreen')}>
            계정이 있으신가요? 로그인하기
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
  bottomContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
});

export default SignUpScreen;