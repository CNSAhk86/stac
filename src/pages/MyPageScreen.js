import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from '@firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const MyPageScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (user) {
      const profileRef = firebase.database().ref(`profiles/${user.uid}`);
      profileRef.once('value').then(snapshot => {
        if (snapshot.exists()) {
          const userProfile = snapshot.val();
          setName(userProfile.name || '');
          setNickname(userProfile.nickname || '');
        }
      });
    }
  }, [user]);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 상단 네비게이션 바 */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={25} color="#333" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>마이페이지</Text>
        </View>

        {/* 프로필 사진 및 프로필 보기 버튼 */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/favicon.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileNickname}>{nickname}</Text>
          </View>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
            <Text style={styles.profileButtonText}>프로필 보기</Text>
          </TouchableOpacity>
        </View>

        {/* 연한 회색 선 */}
        <View style={styles.divider} />

        {/* 나의 활동 */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>나의 활동</Text>
          <View style={styles.creditBox}>
            <View style={styles.creditContainer}>
              <View style={styles.creditInfo}>
                <MaterialIcons name="monetization-on" size={24} color="yellow" />
                <Text style={styles.creditText}>내 크레딧</Text>
                <Text style={styles.creditSubText}>크레딧을 확인해봐요!</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#808080" />
            </View>

            {/* 크레딧 관리 버튼들 */}
            <View style={styles.creditButtonsContainer}>
              <TouchableOpacity style={styles.creditButton}>
                <Text style={styles.creditButtonText}>+ 충전</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.creditButton}>
                <Text style={styles.creditButtonText}>크레딧 모으기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 다른 활동 섹션들 */}
        <View style={styles.activityContainer}>
          <TouchableOpacity style={styles.activityItem}>
            <MaterialIcons name="question-answer" size={24} color="#333" />
            <Text style={styles.activityTitle}>내 질문</Text>
            <MaterialIcons name="chevron-right" size={24} color="#808080" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityItem}>
            <MaterialIcons name="check-circle" size={24} color="#333" />
            <Text style={styles.activityTitle}>내 답변</Text>
            <MaterialIcons name="chevron-right" size={24} color="#808080" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityItem}>
            <MaterialIcons name="event" size={24} color="#333" />
            <Text style={styles.activityTitle}>대기 / 매칭된 일정</Text>
            <MaterialIcons name="chevron-right" size={24} color="#808080" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    height: 50,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
  },
  profileInfoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileNickname: {
    fontSize: 14,
    marginTop: 5,
    color: '#808080',
  },
  profileButton: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  sectionContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  creditBox: {
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 8,
  },
  creditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  creditInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditSubText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#808080',
    textAlign: 'right',
  },
  creditButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  creditButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 30,
  },
  creditButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activityContainer: {
    marginHorizontal: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 5,
  },
});

export default MyPageScreen;