import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.titleContainer}>
        <Image
          source={require('../../assets/images/whiteBeltt.png')} 
          style={styles.image} 
        />
        <Text style={styles.title}>WhiteBelt</Text>
      </View>

      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ChatIA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    justifyContent: 'space-between',
    padding: 20,
    width: '100%', 
    backgroundColor: '#000',
  },
  titleContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  image: {
    width: 40, 
    height: 40, 
    marginRight: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FACC15',
    borderRadius: 6,
    top: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Header;