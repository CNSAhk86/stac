import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
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
      await setProfile(newProfile);  // Realtime Database에 프로필 저장

      navigation.navigate('MainTabs'); // navigate로 변경
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
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름"
          />
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="별명"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={handlePhoneChange}
            placeholder="전화번호"
            keyboardType="phone-pad"
            maxLength={13}
          />
          <TextInput
            style={styles.input}
            value={keywords}
            onChangeText={setKeywords}
            placeholder="내 키워드"
          />

          <Button
            title={loading ? "저장 중..." : "저장"}
            onPress={handleSaveProfile}
            disabled={loading}
          />
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
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default InitialProfileSetupScreen;
