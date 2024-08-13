import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ setUser }) => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const images = [
    '충무관',
    '인재관',
    '다산관',
    '갤럭시 홀',
    '본관',
  ];

  const posts = [
    {
      title: '청년 개발자 분들 질문좀여',
      content: '님들 연봉 어케됨? 저는 시니어라 존나 버는데 님들은 아직도 쥐꼬... 더보기',
    },
    {
      title: '약간 그지같은데',
      content: '아니 요즘은 디자인도 프론트엔드에서 다 하나봄. 피그마는 장식... 더보기',
    },
    {
      title: '싱글벙글 개발 혼자 하는 한병훈 근황',
      content: '개같이 정신줄을 놓아버림 ㅋㅋㅋ... 더보기',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Replace Text with Image for the logo */}
        <Text>대충 방실 아이콘 들어갈 부분</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
          <MaterialIcons name="account-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.catchPhrase}>
        시니어와 청년의 소통창구,{"\n"}방실이 열어갑니다.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {images.map((item) => (
          <View key={item} style={styles.imageCard}>
            <Image
              source={{ uri: 'https://www.cnsa.hs.kr/rolling_banner/item/a13b40dbbf.jpg' }}
              style={styles.image}
            />
            <Text style={styles.imageText}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.postHeader}>
        <Text style={styles.postsTitle}>오늘의 질문글</Text>
      </View>

      <ScrollView contentContainerStyle={styles.postContainer}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postCard}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Set the background to pure white
  },
  navbar: {
    height: 60,
    backgroundColor: '#ffffff', // White background for the navbar
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000', // Shadow for natural boundary
    shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Elevation for Android shadow
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 40, // Adjust the height as needed
  },
  profileIcon: {
    borderRadius: 15,
    padding: 5,
  },
  catchPhrase: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left', // Align text to the left
    marginVertical: 20,
    marginLeft: 20, // Indent text slightly from the left
    color: '#333', // Dark text color for visibility
    lineHeight: 30, // Ensure adequate spacing between lines
  },
  imageScroll: {
    paddingLeft: 10,
    paddingVertical: 5, // Reduced padding for tighter spacing
    paddingBottom: 20, // Add padding to create more space below the images
  },
  imageCard: {
    width: 195,
    height: 250,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'left', // Align text to the left
    paddingLeft: 10, // Add padding for left-aligned text
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  postHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 0, // Slightly smaller margin, managed by padding in imageScroll
  },
  postsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5, // Space between title and first post
  },
  postContainer: {
    paddingHorizontal: 15,
    paddingTop: 5, // Reduced padding for tighter spacing
  },
  postCard: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Dark text color for titles
  },
  postContent: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});

export default HomeScreen;
