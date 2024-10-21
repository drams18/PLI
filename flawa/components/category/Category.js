import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const categories = [
  { id: 1, name: 'Maquillage', icon: require('./assets/icons/makeup.png') },
  { id: 2, name: 'Soin de la peau', icon: require('./assets/icons/skincare.png') },
  { id: 3, name: 'Parfums', icon: require('./assets/icons/perfume.png') },
  { id: 4, name: 'Cheveux', icon: require('./assets/icons/haircare.png') },
  { id: 5, name: 'Accessoires', icon: require('./assets/icons/accessories.png') },
];

const Category = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.card}
          onPress={() => navigation.navigate('CategoryProducts', { category })}
        >
          <Image source={category.icon} style={styles.icon} />
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Category;