import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WaitingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.title}>이메일 인증을 기다리고 있습니다...</Text>
        <Text style={styles.instructions}>
          이메일에서 인증 링크를 확인하고 클릭한 후 다시 이 페이지로 돌아와주세요.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WaitingScreen;