import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const TravelDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { travel } = route.params; // 선택된 여행 정보를 가져옴

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 헤더 바 */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={25} color="#333" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>여행 상세 정보</Text>
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
          {/* 목적지 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>목적지</Text>
            <Text style={styles.detailText}>{travel.destination}</Text>
          </View>

          {/* 일시 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>일시</Text>
            <Text style={styles.detailText}>{travel.dateTime}</Text>
          </View>

          {/* 집합 장소 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>집합 장소</Text>
            <Text style={styles.detailText}>{travel.location}</Text>
          </View>

          {/* 상태 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>상태</Text>
            <Text style={styles.detailText}>{travel.status}</Text>
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
    paddingHorizontal: 15,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 7,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default TravelDetailScreen;
