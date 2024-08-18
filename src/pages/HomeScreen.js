import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ImageCarousel from '../components/ImageCarousel';
import PostList from '../components/PostList';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const banners = [
    require('../../assets/banner/banner1.png'),
    require('../../assets/banner/banner2.png'),
    require('../../assets/banner/banner3.png'),
  ];

  const images = [
    { uri: require('../../assets/img/image1.png'), label: '부산 해운대' },
    { uri: require('../../assets/img/image2.png'), label: '전주 한옥마을' },
    { uri: require('../../assets/img/image3.png'), label: '온양 민속촌' },
    { uri: require('../../assets/img/image4.png'), label: '경복궁' },
    { uri: require('../../assets/img/image5.png'), label: '덕수궁' },
    { uri: require('../../assets/img/image6.png'), label: '서울역 광장' },
    { uri: require('../../assets/img/image7.png'), label: '부산 먹거리 골목' },
  ];

  const posts = [
    {
      title: '청년 개발자 분들 질문좀여',
      writer: '시니어',
      content: '님들 연봉 어케됨? 저는 시니어라 존나 버는데 님들은 아직도 쥐꼬리 월급받고 사시나요?ㅋㅋㅋㅋ',
      profileImage: require('../../assets/favicon.png'),
    },
    {
      title: '약간 그지같은데',
      writer: '디자이너가 싫은 개발자',
      content: '아니 요즘은 디자인도 프론트엔드에서 다 하나봄. 피그마는 장식인가 진짜 빡치네요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
      profileImage: require('../../assets/favicon.png'),
    },
    {
      title: '싱글벙글 혼자하는 개발 근황',
      writer: '충삼이',
      content: '개같이 정신줄을 놓아버림 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㄴㄴㄴㄴㄴㄴ',
      profileImage: require('../../assets/favicon.png'),
    },
  ];

  const reItems = [
    {
      title: '리액트 네이티브 초보입니다',
      writer: '초보개발자',
      content: '리액트 네이티브에서 상태 관리 어떻게 하면 좋을까요? 여러가지 패턴들이 있던데... 고민입니다.',
      profileImage: require('../../assets/favicon.png'),
    },
    {
      title: '디버깅이 어려워요',
      writer: '초보개발자',
      content: '리액트 네이티브에서 디버깅할 때 콘솔로그 외에 다른 방법이 있을까요?',
      profileImage: require('../../assets/favicon.png'),
    },
  ];

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleTravelPress = () => {
    navigation.navigate('TravelCourses');
  };

  const handlePopularPostsPress = () => {
    navigation.navigate('PopularPosts');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onMomentumScrollEnd = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleHomePress}>
          <Image source={require('../../assets/icon.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileIcon}>
            <MaterialIcons name="account-circle" size={25} color="#808080" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationIcon}>
            <MaterialIcons name="notifications" size={25} color="#808080" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        {/* ScrollView content should have paddingTop equal to navbar height */}
        <View style={{ paddingTop: 50 }}> 
          {/* Banner Carousel */}
          <View style={styles.bannerWrapper}>
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              onMomentumScrollEnd={onMomentumScrollEnd}
              style={styles.bannerContainer}
            >
              {banners.map((banner, index) => (
                <Image key={index} source={banner} style={styles.bannerImage} />
              ))}
            </Animated.ScrollView>
            <View style={styles.dotContainer}>
              {banners.map((_, index) => {
                const opacity = scrollX.interpolate({
                  inputRange: [
                    (index - 1) * width,
                    index * width,
                    (index + 1) * width,
                  ],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={index}
                    style={[styles.dot, { opacity }]}
                  />
                );
              })}
            </View>
          </View>

          <TouchableOpacity onPress={handleTravelPress} style={styles.headerContainer}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>여행 코스 추천 🧭</Text>
              <MaterialIcons name="chevron-right" size={25} color="#333" />
            </View>
          </TouchableOpacity>

          <ImageCarousel images={images} />

          {/* Horizontal line (hr) */}
          <View style={styles.hr} />

          <TouchableOpacity onPress={handlePopularPostsPress} style={styles.postHeader}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.postsTitle}>오늘의 인기 질문글 🔥</Text>
              <MaterialIcons name="chevron-right" size={25} color="#333" />
            </View>
          </TouchableOpacity>

          <View style={styles.postListContainer}>
            <PostList posts={posts} />
          </View>

          <View style={styles.hr} />

          {/* Render second PostList with reItems */}
          <TouchableOpacity onPress={handlePopularPostsPress} style={styles.postHeader}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.postsTitle}>당신의 도움이 필요한 글 🗂️</Text>
              <MaterialIcons name="chevron-right" size={25} color="#333" />
            </View>
          </TouchableOpacity>

          <View style={styles.postListContainer}>
            <PostList posts={reItems} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={handleHomePress}>
          <MaterialIcons name="home" size={32} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
          <MaterialIcons name="search" size={32} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleProfilePress}>
          <MaterialIcons name="person" size={32} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 60, // Ensure there's space for the fixed bottom navigation
  },
  bannerWrapper: {
    position: 'relative',
    marginBottom: 5,
  },
  bannerContainer: {
    height: 200,
  },
  bannerImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  navbar: {
    height: 50,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure the navbar is always on top
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft: -20,
    marginTop: -5,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    borderRadius: 15,
    padding: 5,
    marginLeft: 15,
  },
  notificationIcon: {
    borderRadius: 15,
    padding: 5,
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  hr: {
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  postHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  postsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  postListContainer: {
    paddingHorizontal: 15,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;