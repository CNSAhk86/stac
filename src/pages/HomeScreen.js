import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Animated, StatusBar, SafeAreaView } from 'react-native';
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
    {
      image: require('../../assets/banner/banner1.png'),
      title: '오늘의 건강 소식',
      subtitle: '가장 맛있는 것, 사실 가장 건강에 좋은 것?',
      buttonLabel: '살펴보기',
      onPress: () => {
        navigation.navigate('Explore');
      },
    },
    {
      image: require('../../assets/banner/banner2.png'),
      title: '충남에 숨겨진 보물',
      subtitle: '부여 대조사로 놀러오세요!', // 소제목
      buttonLabel: '살펴보기',
      onPress: () => {
        navigation.navigate('Discover');
      },
    },
    {
      image: require('../../assets/banner/banner3.png'),
      title: '이색 가족 여행지 추천',
      subtitle: '오늘은 가족과 함께 이곳으로 떠나볼까요?', // 소제목
      buttonLabel: '살펴보기',
      onPress: () => {
        navigation.navigate('Adventure');
      },
    },
  ];

  const images = [
    { uri: require('../../assets/img/image1.png'), catchphrase: '에메랄드 빛 바다가 아름다운 곳', location: '부산 해운대' },
    { uri: require('../../assets/img/image2.png'), catchphrase: '옛 거리의 풍속', location: '전주 한옥마을' },
    { uri: require('../../assets/img/image3.png'), catchphrase: '민족의 얼이 살아 숨쉬는', location: '온양 민속촌' },
    { uri: require('../../assets/img/image4.png'), catchphrase: '상징과도 같은 관광지', location: '경복궁' },
    { uri: require('../../assets/img/image5.png'), catchphrase: '무구한 역사와 전통의', location: '덕수궁' },
    { uri: require('../../assets/img/image6.png'), catchphrase: '추억이 깃든', location: '서울역 광장' },
    { uri: require('../../assets/img/image7.png'), catchphrase: '맛있는게 걸어갈 때마다 나오는', location: '부산 먹거리 골목' },
  ];

  const travelData = [
    {
      uri: require('../../assets/img/image1.png'),
      destination: '부산 해운대',
      status: '매칭 대기 중',
      dateTime: '2024-09-01 09:00',
      location: '부산 어딘가',
    },
    {
      uri: require('../../assets/img/image2.png'),
      destination: '전주 한옥마을',
      status: '마감됨',
      dateTime: '2024-09-05 13:00',
      location: '전주 어딘가',
    },
    {
      uri: require('../../assets/img/image3.png'),
      destination: '온양 민속촌',
      status: '취소됨',
      dateTime: '2024-09-11 08:00',
      location: '온양 어딘가',
    },
    {
      uri: require('../../assets/img/image4.png'),
      destination: '경복궁',
      status: '취소됨',
      dateTime: '2024-09-12 08:00',
      location: '서울 어딘가',
    },
    {
      uri: require('../../assets/img/image5.png'),
      destination: '덕수궁',
      status: '취소됨',
      dateTime: '2024-09-14 08:00',
      location: '서울 어딘가',
    },
    {
      uri: require('../../assets/img/image6.png'),
      destination: '서울역 광장',
      status: '취소됨',
      dateTime: '2024-09-17 08:00',
      location: '서울역 어딘가',
    },
    {
      uri: require('../../assets/img/image7.png'),
      destination: '부산 먹거리 골목',
      status: '취소됨',
      dateTime: '2024-09-20 08:00',
      location: '부산 어딘가',
    },
];

  const posts = [
    {
      title: '청년 개발자 분들 질문좀여',
      writer: '시니어',
      content: '님들 연봉 어케됨? 저는 시니어라 존나 버는데 님들은 아직도 쥐꼬리 월급받고 사시나요?ㅋㅋㅋㅋ',
      profileImage: require('../../assets/favicon.png'),
      status: '답변 대기 중'
    },
    {
      title: '약간 그지같은데',
      writer: '디자이너가 싫은 개발자',
      content: '아니 요즘은 디자인도 프론트엔드에서 다 하나봄. 피그마는 장식인가 진짜 빡치네요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
      profileImage: require('../../assets/favicon.png'),
      status: '답변 완료'
    },
    {
      title: '싱글벙글 혼자하는 개발 근황',
      writer: '충삼이',
      content: '개같이 정신줄을 놓아버림 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㄴㄴㄴㄴㄴㄴ',
      profileImage: require('../../assets/favicon.png'),
      status: '답변 대기 중'
    },
  ];

  const reItems = [
    {
      title: '리액트 네이티브 초보입니다',
      writer: '초보개발자',
      content: '리액트 네이티브에서 상태 관리 어떻게 하면 좋을까요? 여러가지 패턴들이 있던데... 고민입니다.',
      profileImage: require('../../assets/favicon.png'),
      status: '답변 대기 중'
    },
    {
      title: '디버깅이 어려워요',
      writer: '초보개발자',
      content: '리액트 네이티브에서 디버깅할 때 콘솔로그 외에 다른 방법이 있을까요?',
      profileImage: require('../../assets/favicon.png'),
      status: '답변 대기 중'

    },
  ];

  const handleProfilePress = () => {
    navigation.navigate('MyPageTab', {
      screen: 'MypageScreen'
    });
  };  
  

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleTravelPress = () => {
    navigation.navigate('TravelTab', {
      screen: 'TravelScreen'
    });
  };

  const handleBoardPress = (category) => {
    navigation.navigate('PostTab', {
      screen: 'PostScreen',
      params: { initialCategory: category }
    });
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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
          <View style={{ paddingTop: 15 }}> 
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
                <View key={index} style={styles.bannerImageContainer}>
                  <Image source={banner.image} style={styles.bannerImage} />
                  <View style={styles.bannerOverlay} />
                  <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{banner.title}</Text>
                    <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                    <TouchableOpacity style={styles.bannerButton} onPress={banner.onPress}>
                      <Text style={styles.bannerButtonText}>{banner.buttonLabel}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
                <Text style={styles.headerTitle}>이번 달 여행 매칭 코스 🧭</Text>
                <MaterialIcons name="chevron-right" size={25} color="#333" />
              </View>
            </TouchableOpacity>

            <ImageCarousel images={images} travelData={travelData} />


            {/* Horizontal line (hr) */}
            <View style={styles.hr} />

            <TouchableOpacity onPress={() => handleBoardPress('인기')} style={styles.postHeader}>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.postsTitle}>최근 도움 요청 게시글 🔥</Text>
                <MaterialIcons name="chevron-right" size={25} color="#333" />
              </View>
            </TouchableOpacity>

            <View style={styles.postListContainer}>
              <PostList posts={posts} />
            </View>

            <View style={styles.hr} />

            <TouchableOpacity onPress={() => handleBoardPress('답변 대기 중')} style={styles.postHeader}>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.postsTitle}>당신을 기다리는 게시글 🗂️</Text>
                <MaterialIcons name="chevron-right" size={25} color="#333" />
              </View>
            </TouchableOpacity>

            <View style={styles.postListContainer}>
              <PostList posts={reItems} />
            </View>
          </View>
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
  scrollView: {
    flexGrow: 1,
  },
  bannerWrapper: {
    position: 'relative',
    marginBottom: 5,
  },
  bannerContainer: {
    height: 200,
  },
  bannerImageContainer: {
    width: width - 20,
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    position: 'relative',
  },
  bannerImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 15,
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#BDBDBD',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  bannerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  bannerButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1000,
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
});

export default HomeScreen;