import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useNavigation } from '@react-navigation/native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

const TermsAgreementScreen = ({ route }) => {
  const { destination, location, date } = route.params;
  const navigation = useNavigation();

  const [agreedTerms, setAgreedTerms] = useState({
    all: false,
    term1: false,
    term2: false,
    term3: false,
  });

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Hide bottom menu bar when this screen is active
    navigation.getParent()?.setOptions({ tabBarVisible: false });

    return () => {
      // Restore bottom menu bar when this screen is inactive
      navigation.getParent()?.setOptions({ tabBarVisible: true });
    };
  }, [navigation]);

  const handleCheckBox = (term) => {
    if (term === 'all') {
      const allChecked = !agreedTerms.all;
      setAgreedTerms({
        all: allChecked,
        term1: allChecked,
        term2: allChecked,
        term3: allChecked,
      });
    } else {
      setAgreedTerms((prevState) => ({
        ...prevState,
        [term]: !prevState[term],
        all: prevState.term1 && prevState.term2 && prevState.term3 && term !== 'all',
      }));
    }
  };

  const handleSubmit = () => {
    if (!agreedTerms.term1 || !agreedTerms.term2 || !agreedTerms.term3) {
      setModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleConfirm = () => {
    const user = firebase.auth().currentUser;
    const profileRef = firebase.database().ref(`profiles/${user.uid}`);

    profileRef.once('value').then((snapshot) => {
      if (snapshot.exists()) {
        const currentCredit = snapshot.val().credit || 0;
        if (currentCredit >= 200) {
          profileRef.update({ credit: currentCredit - 200 });
          setModalVisible(false);
          navigation.navigate('NextPage'); // 신청 완료 후 다음 페이지로 이동
        } else {
          setModalVisible(false);
          alert('크레딧이 부족합니다. 충전해주세요.');
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* 좌상단 < 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* 안내 문구 (우측 정렬) */}
      <Text style={styles.title}>결제를 진행하기 위해서는{"\n"}약관에 동의해주세요</Text>

      {/* 상품 정보 */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>상품 정보:</Text>
        <Text style={styles.infoText}>여행지: {destination}</Text>
        <Text style={styles.infoText}>집합 장소: {location}</Text>
        <Text style={styles.infoText}>날짜: {date}</Text>
      </View>

      {/* 약관 동의 목록 (스크롤 없이) */}
      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => handleCheckBox('all')} style={styles.termRow}>
          <Text style={styles.boldText}>전체 동의</Text>
          <MaterialIcons
            name={agreedTerms.all ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={agreedTerms.all ? 'black' : '#666'}
          />
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity onPress={() => handleCheckBox('term1')} style={styles.termRow}>
          <Text style={styles.termText}>[필수] 주의 사항 1에 동의합니다.</Text>
          <MaterialIcons
            name={agreedTerms.term1 ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={agreedTerms.term1 ? 'black' : '#666'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleCheckBox('term2')} style={styles.termRow}>
          <Text style={styles.termText}>[필수] 주의 사항 2에 동의합니다.</Text>
          <MaterialIcons
            name={agreedTerms.term2 ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={agreedTerms.term2 ? 'black' : '#666'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleCheckBox('term3')} style={styles.termRow}>
          <Text style={styles.termText}>[선택] 주의 사항 3에 동의합니다.</Text>
          <MaterialIcons
            name={agreedTerms.term3 ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={agreedTerms.term3 ? 'black' : '#666'}
          />
        </TouchableOpacity>
      </View>

      {/* 신청 버튼 */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>200 크레딧으로 신청하기</Text>
      </TouchableOpacity>

      {/* 커스텀 팝업 모달 */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)} // 배경을 누르면 모달 닫힘
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>신청 확인</Text>
          <Text style={styles.modalText}>정말로 신청하시겠습니까?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)} // 취소
            >
              <Text style={styles.modalButtonText}>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleConfirm} // 신청 확인 후 처리
            >
              <Text style={styles.modalButtonText}>예</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'left', // 우측 정렬
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  termsContainer: {
    marginBottom: 20,
  },
  termRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  termText: {
    fontSize: 16,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#000',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TermsAgreementScreen;
