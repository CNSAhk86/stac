import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { getAuth, signOut } from '@firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import { ProfileContext } from '../contexts/ProfileContext';  // 경로에 맞게 수정
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';  // Realtime Database
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const { profile, setProfile, loading } = useContext(ProfileContext);  // 프로필 데이터 가져오기

  const [name, setName] = useState(profile.name || '');
  const [nickname, setNickname] = useState(profile.nickname || '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [keywords, setKeywords] = useState(profile.keywords || '');

  const [isEditing, setIsEditing] = useState({
    name: false,
    nickname: false,
    email: false,
    phone: false,
    keywords: false,
  });

  useEffect(() => {
    if (user) {
      const profileRef = firebase.database().ref(`profiles/${user.uid}`);
      profileRef.once('value').then(snapshot => {
        if (snapshot.exists()) {
          const userProfile = snapshot.val();
          setProfile(userProfile);  // Context에 프로필 업데이트
          setName(userProfile.name || '');
          setNickname(userProfile.nickname || '');
          setPhone(userProfile.phone || '');
          setKeywords(userProfile.keywords || '');
        }
      });
    }
  }, [user]);

  const handleEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('SignInScreen');
      })
      .catch((error) => {
        console.error('Logout failed: ', error);
      });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={25} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>프로필</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {loading ? (
            // 스켈레톤 UI 렌더링
            <SkeletonPlaceholder>
              <View style={styles.profileImageContainer}>
                <View style={styles.skeletonProfileImage} />
                <View style={styles.skeletonText} />
              </View>
              <View style={styles.skeletonFieldContainer}>
                <View style={styles.skeletonText} />
                <View style={styles.skeletonInput} />
              </View>
              <View style={styles.skeletonFieldContainer}>
                <View style={styles.skeletonText} />
                <View style={styles.skeletonInput} />
              </View>
              <View style={styles.skeletonFieldContainer}>
                <View style={styles.skeletonText} />
                <View style={styles.skeletonInput} />
              </View>
              <View style={styles.skeletonFieldContainer}>
                <View style={styles.skeletonText} />
                <View style={styles.skeletonInput} />
              </View>
              <View style={styles.skeletonFieldContainer}>
                <View style={styles.skeletonText} />
                <View style={styles.skeletonInput} />
              </View>
            </SkeletonPlaceholder>
          ) : (
            // 실제 프로필 UI 렌더링
            <>
              <View style={styles.profileImageContainer}>
                <Image source={require('../../assets/favicon.png')} style={styles.profileImage} />
                <TouchableOpacity>
                  <Text style={styles.uploadText}>프로필 업로드</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>이름</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, !isEditing.name && styles.disabledInput]}
                    value={name}
                    onChangeText={setName}
                    editable={isEditing.name}
                    placeholder="로딩 중.."
                  />
                  <TouchableOpacity onPress={() => handleEdit('name')}>
                    <MaterialIcons name="edit" size={20} color="#808080" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>별명</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, !isEditing.nickname && styles.disabledInput]}
                    value={nickname}
                    onChangeText={setNickname}
                    editable={isEditing.nickname}
                    placeholder="로딩 중.."
                  />
                  <TouchableOpacity onPress={() => handleEdit('nickname')}>
                    <MaterialIcons name="edit" size={20} color="#808080" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>메일</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, !isEditing.email && styles.disabledInput]}
                    value={email}
                    onChangeText={setEmail}
                    editable={isEditing.email}
                    placeholder="로딩 중.."
                  />
                  <TouchableOpacity onPress={() => handleEdit('email')}>
                    <MaterialIcons name="edit" size={20} color="#808080" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>전화번호</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, !isEditing.phone && styles.disabledInput]}
                    value={phone}
                    onChangeText={(text) => {
                      const formattedText = text.replace(/[^0-9]/g, '')
                        .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
                      setPhone(formattedText);
                    }}
                    editable={isEditing.phone}
                    placeholder="로딩 중.."
                    keyboardType="phone-pad"
                  />
                  <TouchableOpacity onPress={() => handleEdit('phone')}>
                    <MaterialIcons name="edit" size={20} color="#808080" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>내 키워드</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, !isEditing.keywords && styles.disabledInput]}
                    value={keywords}
                    onChangeText={setKeywords}
                    editable={isEditing.keywords}
                    placeholder="로딩 중.."
                  />
                  <TouchableOpacity onPress={() => handleEdit('keywords')}>
                    <MaterialIcons name="edit" size={20} color="#808080" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                  <Text style={styles.buttonText}>로그아웃</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
  navbar: {
    height: 50,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1000,
  },
  navTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  uploadText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 25,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 5,
    color: '#333',
  },
  disabledInput: {
    color: '#999',
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  skeletonProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  skeletonText: {
    width: '60%',
    height: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonFieldContainer: {
    marginBottom: 25,
  },
  skeletonInput: {
    width: '100%',
    height: 20,
    borderRadius: 4,
  },
});

export default ProfileScreen;
