import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ProfileContext } from '../contexts/ProfileContext';

const InitialProfileSetupScreen = ({ navigation }) => {
  const auth = firebase.auth();
  const user = auth.currentUser;

  const { setProfile } = useContext(ProfileContext);

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formatPhoneNumber = (text) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length > 3) {
      formatted = cleaned.substring(0, 3) + '-' + cleaned.substring(3);
    }
    if (cleaned.length > 7) {
      formatted = cleaned.substring(0, 3) + '-' + cleaned.substring(3, 7) + '-' + cleaned.substring(7);
    }

    return formatted;
  };

  const handlePhoneChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
  };

  const handleSaveProfile = async () => {
    if (!name.trim() || !nickname.trim() || !phone.trim() || !keywords.trim()) {
      setErrorMessage('모든 필드를 채워주세요.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await firebase.auth().currentUser.updateProfile({ displayName: name });

      const newProfile = { name, nickname, phone, keywords };
      await setProfile(newProfile);

      navigation.navigate('MainTabs');
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>초기 프로필 설정</Text>
          <Text style={styles.subtitle}>프로필 정보를 입력하여 시작하세요!</Text>
          
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름 입력"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>별명</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="별명 입력"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>전화번호</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={handlePhoneChange}
            placeholder="전화번호 입력"
            keyboardType="phone-pad"
            maxLength={13}
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>내 키워드</Text>
          <TextInput
            style={styles.input}
            value={keywords}
            onChangeText={setKeywords}
            placeholder="키워드 입력"
            placeholderTextColor="#ccc"
          />

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                <Text style={styles.buttonText}>저장</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: 10,
    color: '#666',
    marginBottom: 5,
    marginLeft: 2,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 7,
    width: '100%',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default InitialProfileSetupScreen;
