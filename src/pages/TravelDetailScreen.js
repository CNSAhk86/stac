import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const TravelDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { travel } = route.params;

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  // Google Maps iframe HTML 코드
  const mapHtml = `
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52163.24127019322!2d129.16387580000003!3d35.20142265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35688d9fdaeda715%3A0x21c4cd40510865a5!2z67aA7IKw6rSR7Jet7IucIO2VtOyatOuMgOq1rA!5e0!3m2!1sko!2skr!4v1725275789449!5m2!1sko!2skr" 
      width="100%" 
      height="100%" 
      style="border:0;" 
      allowfullscreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  `;

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

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* 여행지 제목 */}
          <Text style={styles.destinationTitle}>{travel.destination}</Text>

          {/* Google Maps Iframe */}
          {travel.destination === '부산 해운대' && (
            <View style={styles.mapContainer}>
              <WebView
                originWhitelist={['*']}
                source={{ html: mapHtml }}
                style={styles.map}
              />
            </View>
          )}

          {/* 여행 정보 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>일시</Text>
            <Text style={styles.detailText}>{travel.dateTime}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>집합 장소</Text>
            <Text style={styles.detailText}>{travel.location}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>상태</Text>
            <Text style={styles.detailText}>{travel.status}</Text>
          </View>

          {/* 기타 안내 */}
          <Text style={styles.noteText}>* 기타 식비는 개인 부담입니다.</Text>

          {/* 신청 버튼 */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>200 크레딧으로 신청하기</Text>
          </TouchableOpacity>
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
  scrollViewContent: {
    padding: 15,
  },
  destinationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    height: 300, // WebView height
  },
  map: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
  noteText: {
    fontSize: 12,
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TravelDetailScreen;
