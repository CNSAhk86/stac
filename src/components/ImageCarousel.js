import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const ImageCarousel = ({ images }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
      {images.map((item, index) => (
        <View key={index} style={styles.imageCard}>
          <Image source={item.uri} style={styles.image} />
          <View style={styles.overlay} />
          <Text style={styles.imageText}>{item.label}</Text>
        </View>
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
    width: 195,
    height: 250,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    position: 'relative', // Needed for overlay
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // Make sure the image is also rounded
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fill the entire view with the overlay
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the opacity for the dark effect
    borderRadius: 10, // Keep the overlay rounded
  },
  imageText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 0,
    textAlign: 'left',
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
});

export default ImageCarousel;