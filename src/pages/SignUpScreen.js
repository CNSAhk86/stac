import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { MaterialIcons } from '@expo/vector-icons'; // 아이콘 추가

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 첫 번째 비밀번호 표시 여부 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 두 번째 비밀번호 표시 여부 상태
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일 주소입니다.';
      case 'auth/invalid-email':
        return '유효하지 않은 이메일 주소입니다.';
      case 'auth/operation-not-allowed':
        return '이메일/비밀번호 회원가입이 현재 사용 중지 상태입니다.';
      case 'auth/weak-password':
        return '비밀번호가 너무 약합니다. 더 강력한 비밀번호를 입력하세요.';
      default:
        return '회원가입에 실패했습니다. 다시 시도해주세요.';
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('InitialProfileSetupScreen');
    } catch (error) {
      setErrorMessage(getErrorMessage(error.code));
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>처읍 뵙겠습니다 :){'\n'}소통 창구 방실입니다.</Text>
      <Text style={styles.subtitle}>이메일로 회원가입을 시작해주세요!</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={[styles.input, { marginBottom: 20 }]}
        value={email}
        onChangeText={setEmail}
        placeholder="이메일 입력"
        autoCapitalize="none"
        placeholderTextColor="#ccc"
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호 입력"
          secureTextEntry={!showPassword}
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="비밀번호 확인"
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <MaterialIcons
            name={showConfirmPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.toggleText}>
        계정이 있으신가요?{' '}
        <Text
          style={styles.signInText}
          onPress={() => navigation.navigate('SignInScreen')}
        >
          로그인하기
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
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 7,
    width: '100%',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
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
  signInText: {
    color: '#aaa',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpScreen;
