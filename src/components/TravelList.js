import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TravelList = ({ travels = [] }) => {
  const navigation = useNavigation();

  const getStatusStyle = (status) => {
    switch (status) {
      case '매칭 대기 중':
        return styles.statusPending;
      case '마감됨':
        return styles.statusMatched;
      case '취소됨':
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

  const handlePress = (travel) => {
    navigation.navigate('TravelDetail', { travel });
  };

  return (
    <ScrollView contentContainerStyle={styles.travelContainer}>
      {travels.map((travel, index) => (
        <TouchableOpacity
          key={index}
          style={styles.travelCard}
          onPress={() => handlePress(travel)}
        >
          <View style={styles.destinationContainer}>
            <Text style={styles.destinationName}>{travel.destination}</Text>
            <View style={[styles.statusContainer, getStatusStyle(travel.status)]}>
              <Text style={styles.statusText}>{travel.status}</Text>
            </View>
          </View>
          <Text style={styles.travelDateTime}>
            <Text style={styles.labelBold}>일시:</Text> {travel.dateTime}
          </Text>
          <Text style={styles.travelLocation}>
            <Text style={styles.labelBold}>집합 장소:</Text> {travel.location}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  travelContainer: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  travelCard: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    marginLeft: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusPending: {
    backgroundColor: '#FFBF00',
    borderColor: '#FFC107',
  },
  statusMatched: {
    backgroundColor: '#00BFFF',
    borderColor: '#58ACFA',
  },
  statusCancelled: {
    backgroundColor: '#FF6347',
    borderColor: '#FF4500',
  },
  statusDefault: {
    backgroundColor: '#D3D3D3',
    borderColor: '#A9A9A9',
  },
  travelDateTime: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  travelLocation: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  labelBold: {
    fontWeight: 'bold',
    color: '#555',
  },
});

export default TravelList;
