import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const WritePostScreen = () => {
  const navigation = useNavigation();
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');

  const tags = ['#조언', '#IT', '#기구 도움', '#기타']; // 태그 목록

  const handleTagPress = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag); // 이미 선택된 태그는 제거
      } else {
        return [...prevTags, tag]; // 새 태그 추가
      }
    });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleSavePress = () => {
    // 글 작성 저장 로직 구현 예정
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>글 작성</Text>
        <View style={styles.rightIcons}>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 토픽 설정 UI */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>토픽 선택</Text>
          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tagButton,
                  selectedTags.includes(tag) && styles.tagButtonSelected, // 선택된 태그 스타일 적용
                ]}
                onPress={() => handleTagPress(tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedTags.includes(tag) && styles.tagTextSelected, // 선택된 태그 텍스트 스타일 적용
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 이미지 업로드 UI */}
        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>이미지 업로드</Text>
          <TouchableOpacity style={styles.imageUploadButton}>
            <MaterialIcons name="photo-camera" size={24} color="#999" />
            <Text style={styles.imageUploadText}>이미지 추가</Text>
          </TouchableOpacity>
        </View>

        {/* 제목 입력 UI */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* 내용 작성 UI */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="내용을 입력하세요"
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>

        {/* 위치 설정 UI */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>위치 설정</Text>
          <TouchableOpacity style={styles.locationButton}>
            <MaterialIcons name="location-on" size={24} color="#999" />
            <Text style={styles.locationText}>현재 위치 설정</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navbar: {
    height: 50,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
    marginLeft: 20,
    marginRight:0,
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagButtonSelected: {
    backgroundColor: '#333',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  tagTextSelected: {
    color: '#fff',
  },
  imageUploadContainer: {
    marginVertical: 10,
  },
  imageUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  imageUploadText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#999',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#999',
  },
  saveButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  navText: {
    fontSize: 10,
    color: '#333',
  },
});

export default WritePostScreen;
