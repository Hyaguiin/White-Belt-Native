import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const Header = () => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute', 
      top: 0, 
      left: 0, 
      zIndex: 1000, 
      justifyContent: 'space-between',
      padding: 20,
      width: '380',
      backgroundColor: '#000', 
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      }}>WhiteBelt</Text>
      
      <TouchableOpacity style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#FACC15', 
        borderRadius: 8,
      }}>
        <Text style={{
          color: 'white',
          fontSize: 16,
        }}>Opcões</Text>
      </TouchableOpacity>
    </View>
  );
};
