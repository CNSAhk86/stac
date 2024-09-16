import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import PostList from '../components/PostList';  // 기존 PostList 컴포넌트 가져오기

const PostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedCategory, setSelectedCategory] = useState(route.params?.initialCategory || '전체');

  useEffect(() => {
    console.log('Received initialCategory:', route.params?.initialCategory);
    if (route.params?.initialCategory) {
      setSelectedCategory(route.params.initialCategory);
    }
  }, [route.params?.initialCategory]);

  const categories = ['전체', '인기', '답변 대기 중', '답변 완료'];

  const posts = [
  ];
  const handleProfilePress = () => {
    navigation.navigate('MyPageTab', {
      screen: 'MypageScreen'
    });
  };  

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 업데이트
  };

  const handleWritePress = () => {
    navigation.navigate('WritePostScreen');  // 글 작성 페이지로 이동
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={25} color="#333" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>게시글</Text>
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

          <PostList posts={posts.filter(post => post.status === selectedCategory || selectedCategory === '전체')} />

        </ScrollView>

        <TouchableOpacity style={styles.floatingButton} onPress={handleWritePress}>
          <MaterialIcons name="edit" size={24} color="#fff" />
        </TouchableOpacity>
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
  floatingButton: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default PostScreen;
