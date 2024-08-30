import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import TravelList from '../components/TravelList';  // 기존 PostList 컴포넌트 가져오기

const TravelScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedCategory, setSelectedCategory] = useState(route.params?.initialCategory || '전체'); // 초기 카테고리 설정

  const categories = ['전체', '인기', '여유', '마감 임박'];

  const posts = [
    {
      destination: '부산 해운대',
      status: '매칭 대기 중',
      dateTime: '2024-09-01 09:00',
      location: '부산 어딘가',
    },
    {
      destination: '전주 한옥마을',
      status: '매칭 완료',
      dateTime: '2024-09-05 13:00',
      location: '전주 어딘가',
    },
    {
      destination: '온양 민속촌',
      status: '취소됨',
      dateTime: '2024-09-11 08:00',
      location: '온양 어딘가',
    },
    {
      destination: '경복궁',
      status: '취소됨',
      dateTime: '2024-09-12 08:00',
      location: '서울 어딘가',
    },
    {
      destination: '덕수궁',
      status: '취소됨',
      dateTime: '2024-09-14 08:00',
      location: '서울 어딘가',
    },
    {
      destination: '서울역 광장',
      status: '취소됨',
      dateTime: '2024-09-17 08:00',
      location: '서울역 어딘가',
    },
    {
      destination: '부산 먹거리 골목',
      status: '취소됨',
      dateTime: '2024-09-20 08:00',
      location: '부산 어딘가',
    },
];

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 업데이트
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={25} color="#333" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>여행 매칭 현황</Text>
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
              <MaterialIcons name="account-circle" size={25} color="#808080" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationIcon}>
              <MaterialIcons name="notifications" size={25} color="#808080" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력하세요"
              placeholderTextColor="#999"
            />
            <MaterialIcons name="search" size={24} color="#999" />
          </View>

          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton, // 선택된 카테고리일 때 스타일 변경
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText, // 선택된 카테고리일 때 텍스트 스타일 변경
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TravelList travels={posts} />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navbar: {
    height: 50,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    left: 50,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    marginLeft: 15,
    marginRight: 0,
  },
  notificationIcon: {
    marginLeft: 10,
    marginRight: 5,
  },
  scrollView: {
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // 좌측 정렬을 위해 추가
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 10, // 버튼 간 간격 추가
  },
  selectedCategoryButton: {
    backgroundColor: '#333',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});

export default TravelScreen;
