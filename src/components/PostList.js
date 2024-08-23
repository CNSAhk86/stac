import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const PostList = ({ posts }) => {
  const truncateContent = (content) => {
    if (content.length > 50) {
      return `${content.substring(0, 30)}... 더보기`;
    }
    return content;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case '답변 대기 중':
        return styles.statusPending;
      case '답변 완료':
        return styles.statusAnswered;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.postContainer}>
      {posts.map((post, index) => (
        <View key={index} style={styles.postCard}>
          <View style={styles.writerContainer}>
            <Image source={post.profileImage} style={styles.profileImage} />
            <Text style={styles.writerName}>{post.writer}</Text>
            <View style={[styles.statusContainer, getStatusStyle(post.status)]}>
              <Text style={styles.statusText}>{post.status}</Text>
            </View>
          </View>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent}>
            {truncateContent(post.content)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  postCard: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
  },
  writerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    marginRight: 10,
  },
  writerName: {
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
    backgroundColor: '#FFA500', // 주황색 배경
    borderColor: '#FF8C00',
  },
  statusAnswered: {
    backgroundColor: '#32CD32', // 초록색 배경
    borderColor: '#31B404', // 어두운 초록색 테두리
  },
  statusDefault: {
    backgroundColor: '#D3D3D3', // 기본 회색 배경
    borderColor: '#A9A9A9', // 기본 회색 테두리
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  postContent: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});

export default PostList;
