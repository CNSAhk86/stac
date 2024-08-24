import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TravelScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>여행목록 기능이 준비 중입니다!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default TravelScreen;