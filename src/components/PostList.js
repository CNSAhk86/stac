import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const PostList = ({ posts }) => {
  const truncateContent = (content) => {
    if (content.length > 50) {
      return `${content.substring(0, 30)}... 더보기`;
    }
    return content;
  };

  return (
    <ScrollView contentContainerStyle={styles.postContainer}>
      {posts.map((post, index) => (
        <View key={index} style={styles.postCard}>
          <View style={styles.writerContainer}>
            <Image source={post.profileImage} style={styles.profileImage} />
            <Text style={styles.writerName}>{post.writer}</Text>
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
  moreText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default PostList;
