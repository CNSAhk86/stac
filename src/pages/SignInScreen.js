import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return '유효하지 않은 이메일 주소입니다.';
      case 'auth/user-disabled':
        return '이 계정은 비활성화되었습니다.';
      case 'auth/user-not-found':
        return '해당 이메일 주소로 가입된 계정을 찾을 수 없습니다.';
      case 'auth/wrong-password':
        return '비밀번호가 올바르지 않습니다.';
      default:
        return '로그인에 실패했습니다. 다시 시도해주세요.';
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage(getErrorMessage(error.code));
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요 :){'\n'}소통 창구 방실입니다.</Text>
      <Text style={styles.subtitle}>이메일로 시작해주세요!</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="이메일 입력"
        autoCapitalize="none"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호 입력"
        secureTextEntry
        placeholderTextColor="#ccc"
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.toggleText}>
        아직 계정이 없으신가요?{' '}
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          회원가입하기
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  input: {
    height: 45, // 더 넉넉한 입력란 높이
    borderColor: '#ddd', // 매우 연한 회색 테두리
    borderWidth: 1, // 테두리를 매우 얇게 설정
    marginBottom: 20,
    paddingHorizontal: 12, // 입력란 안의 좌우 여백을 넉넉하게
    paddingVertical: 8, // 입력란 안의 상하 여백을 넉넉하게
    borderRadius: 7,
    width: '100%',
    backgroundColor: '#f9f9f9', // 배경색은 연한 회색
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 7,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 12,
  },
  signUpText: {
    color: '#aaa',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignInScreen;
