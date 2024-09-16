import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ImageCarousel = ({ images, travelData }) => {
  const navigation = useNavigation();

  const handleImagePress = (index) => {
    const selectedTravel = travelData[index];
  
    // TravelDetail로 바로 이동
    navigation.navigate('TravelTab', {
      screen: 'TravelDetail',
      params: { travel: selectedTravel },
    });
  };
  

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
      {images.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(index)} style={styles.imageCard}>
          <Image source={item.uri} style={styles.image} />
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text style={styles.catchphraseText}>{item.catchphrase}</Text>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageScroll: {
    paddingLeft: 10,
    paddingVertical: 5,
    paddingBottom: 20,
  },
  imageCard: {
    width: 240,
    height: 250,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    position: 'relative', // 오버레이를 위해 필요
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // 이미지도 둥글게
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 오버레이가 전체를 덮도록 설정
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 어두운 효과를 위한 배경색 설정
    borderRadius: 10, // 오버레이도 둥글게
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  catchphraseText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '900',
    marginTop: 5,
  },
});

export default ImageCarousel;