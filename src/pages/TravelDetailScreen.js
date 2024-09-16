import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // 아이콘 사용

const TravelDetailScreen = () => {
  const route = useRoute();
  const { travel } = route.params;

  const gradientAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(gradientAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        })
      ])
    ).start();
  }, [gradientAnimation]);

  // 애니메이션을 통해 그라데이션 효과 구현
  const animatedGradient = gradientAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#A4A4A4', '#BDBDBD']
  });

  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <ImageBackground
        source={travel.uri}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* 어두운 오버레이 */}
        <View style={styles.darkOverlay} pointerEvents="none" />

        <View style={styles.topMessage}>
          {/* 애니메이션 그라데이션 텍스트 */}
          <Animated.Text style={[styles.slideDownText, { color: animatedGradient }]}>
            닫으시려면 아래로 내려주세요
          </Animated.Text>
        </View>

        {/* Catchphrase와 Location을 상단에 배치 */}
        <View style={styles.overlay}>
          <Text style={styles.catchphraseText}>{travel.catchphrase}</Text>
          <Text style={styles.locationTextLarge}>{travel.location}</Text>
        </View>
      </ImageBackground>
  
      {/* 고정된 텍스트 카드 */}
      <View style={styles.fixedCard}>
        <View style={styles.detailCard}>
          {/* 여행지 제목 및 기본 정보 */}
          <Text style={styles.destinationTitle}>{travel.destination}</Text>
          <View style={styles.row}>
            <MaterialIcons name="location-on" size={20} color="#333" />
            <Text style={styles.locationText}>{travel.location}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="calendar-today" size={20} color="#333" />
            <Text style={styles.detailText}>{travel.dateTime}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="info" size={20} color="#333" />
            <Text style={styles.detailText}>{travel.status}</Text>
          </View>
  
          {/* 설명 */}
          <Text style={styles.descriptionText}>대충 코스 관련 내용이나 뭐 여행 관련 설명 추가하면 될 듯</Text>
  
          {/* 신청 버튼 */}
          <View style={styles.button}>
            <Text style={styles.buttonText}>200 크레딧으로 신청하기</Text>
          </View>
        </View>
      </View>
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topMessage: {
    position: 'absolute',
    top: 10, // 살짝 아래로 이동
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideDownText: {
    fontSize: 12, // 작고 얇은 글씨체
    fontWeight: '400',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 60, // 위치 조정
    left: 20,
    right: 20,
  },
  catchphraseText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700', // 얇은 글씨체
    textAlign: 'left', // 좌측 정렬
  },
  locationTextLarge: {
    color: 'white',
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'left',
    marginTop: 5,
  },
  fixedCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  detailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  destinationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 7,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TravelDetailScreen;
